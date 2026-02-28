const express = require('express');
const Product = require('../model/product')
const router = express.Router()
const multer = require('multer');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const uploads = multer({ storage: storage })

router.post('/add', verifyToken, isAdmin, uploads.single('image'), async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body

        await Product.create({
            name,
            image: req.file.filename,
            description,
            price,
            stock: quantity,
            createdBy: req.user._id,
            isActive: true
        })

        res.json({
            message: "Product is added"
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})

router.get('/list', verifyToken, async (req, res) => {
    try {
        const productList = await Product.find({})
        res.json({ productList })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
})

router.delete('/delete/:id', verifyToken, isAdmin, async (req,res) => {
    try{
        const {id} = req.params

        await Product.findByIdAndDelete({_id : id})

        res.status(200).json({message: "Product deleted"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Server Error!!"})
    }
})

module.exports = router