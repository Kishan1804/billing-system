const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

    message: {
        type: String,
        require: true
    },

    status: {
        type: String,
        enum: ["new", "read", "replied"],
        default: "new"
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Contact", ContactSchema)