const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },

    lastName: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },

    phone: {
        type: String,
    },

    password: {
        type: String,
        require: true,
    },

    role: {
        type: String,
        enum: ["admin", "staff", "customer"],
        default: "customer",
    },

    isActive:{
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', UserSchema);