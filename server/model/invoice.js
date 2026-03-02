const mongoose = require('mongoose')

const InvoiceItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    productName: String,
    productDescription: String,
    productPrice: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
});

const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        unique: true,
        require: true
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

    dueDate: {
        type: Date,
        required: true
    },

    items: [InvoiceItemSchema],

    taxPercent: {
        type: Number,
        require: true,
        min: 0,
        default: 0
    },

    totalAmount: {
        type: Number,
        require: true
    },

    paidAmount: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["paid", "pending", "partial"],
        default: "pending"
    },

    paymentMethod: {
        type: String,
        enum: ["cash", "upi", "card", "bank", "none"],
        default: "none"
    },

    notes: {
        type: String
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Invoice", InvoiceSchema)