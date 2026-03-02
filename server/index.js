require('dotenv').config()


const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./model/user')
const productRoutes = require('./routes/productRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')
const { verifyToken } = require('./middleware/authMiddleware')


app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB is Connected!!"))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, number } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "User already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            firstName, lastName, email, password: hashedPassword, number, role: "customer", isActive: true
        })

        res.status(201).json({
            message: "User successfully registered"
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error"
        })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(400).json({
                message: "Email is not valid"
            })
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)

        if (!matchPassword) {
            return res.status(400).json({
                message: "Incorrect Password"
            })
        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.TOKEN_KEY,
            { expiresIn: "1D" }
        )


        res.status(200).json({
            token: token,
            user: {
                _id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role
            },
            message: "User Logged in"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error!!!!"
        })
    }
})

app.get('/customer', verifyToken, async (req, res) => {
    try {

        const customerList = await User.find({ role: "customer", isActive: true })

        res.status(200).json(customerList)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server Error!!"
        })
    }
})

app.use('/product', productRoutes)
app.use('/invoice', invoiceRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
