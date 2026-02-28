const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true,
        min: 0,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Product", ProductSchema)