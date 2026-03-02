const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
        require: true
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

    amount: {
        type: Number,
        require: true
    },

    method: {
        type: String,
        enum: ["cash", "upi", "card", "bank"],
        require: true
    },

    status: {
        type: String,
        enum: ["success", "failed", "pending"],
        default: "success"
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Payment", PaymentSchema)