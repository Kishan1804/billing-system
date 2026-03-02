const mongoose = require('mongoose')
const express = require('express');
const Product = require('../model/product')
const Invoice = require('../model/invoice')
const router = express.Router()
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin, isStaff } = require('../middleware/roleMiddleware');


router.get('/generate-number', verifyToken, isStaff, async (req, res) => {
    try {
        const lastInvoice = await Invoice.findOne()
            .sort({ createdAt: -1 })
            .select('invoiceNumber')

        let nextNumber = 1

        if (lastInvoice && lastInvoice.invoiceNumber) {
            const lastNum = parseInt(lastInvoice.invoiceNumber.split('-')[1])
            nextNumber = lastNum + 1
        }

        const invoiceNumber = `INV-${String(nextNumber).padStart(7, '0')}`

        res.status(200).json({ invoiceNumber })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to generate invoice no." })
    }
})

router.post('/create', verifyToken, isStaff, async (req, res) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const { invoiceNumber, customerId, dueDate, items, taxPercent, totalAmount, notes } = req.body

        for (const item of items) {
            const product = await Product.findById(item.productId).session(session)

            if (!product) {
                throw new Error('Product not found')
            }

            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${product.name}`)
            }
        }

        for (const item of items) {
            await Product.findByIdAndUpdate(
                item.productId, { $inc: { stock: -item.quantity } }, { session }
            )
        }

        const invoice = await Invoice.create([{
            invoiceNumber,
            customerId,
            staff: req.user._id,
            dueDate,
            items,
            taxPercent,
            totalAmount,
            notes
        }], { session })

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            message: "Invoice created successfully"
        })

    }
    catch (err) {
        await session.abortTransaction()
        session.endSession()

        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/list', verifyToken, async (req, res) => {
    try {
        let invoiceList = []
        let invoiceCreated = []

        if (req.user.role === 'admin') {
            invoiceList = await Invoice
                .find()
                .populate("customerId", "firstName lastName")
                .sort({ createdAt: -1 })
            invoiceCreated = []
        }
        if (req.user.role === 'staff') {
            invoiceList = []
            invoiceCreated = await Invoice.find({ staff: req.user._id })
        }
        if (req.user.role === 'customer') {
            invoiceList = []
            invoiceCreated = await Invoice.find({ customerId: req.user._id })
        }


        res.json({ invoiceList, role: req.user.role, invoiceCreated })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
})


module.exports = router