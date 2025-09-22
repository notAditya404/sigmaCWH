import express from "express"
import bcrypt from "bcrypt"
import cors from "cors"
import mongoose from "mongoose"
import User from "./models/User.js"
import jwt from "jsonwebtoken"
import Quote from "./models/Quote.js"
import cookieParser from "cookie-parser"

await mongoose.connect('mongodb://127.0.0.1:27017/authApp');


const app = express()
const port = 3000

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",   // your frontend origin (React/Vite/Next etc.)
  credentials: true                   // allow cookies
}));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/signup", express.json(), async (req, res) => {
    let userInfo = { ...req.body }
    console.log(userInfo)

    let found = await User.find({ email: userInfo.email }).select("-password")
    if (found.length > 0) {
        console.log(found)
        return res.status(400).json({ msg: "User already exist", success: false })
    }

    if (userInfo.name == "" || userInfo.email == "" || userInfo.password == "") {
        return res.status(400).json({ msg: "Kindly fill complete form", success: false })
    }

    bcrypt.hash(userInfo.password, 10, async function (err, hash) {
        const user = new User({ name: userInfo.name, email: userInfo.email, password: hash })
        await user.save()
        res.status(200).json({ msg: "Signup Success!! Kindly Login", success: true })
    });
})


app.post("/login", express.json(), async (req, res) => {
    const userInfo = { ...req.body }
    console.log(userInfo)
    let user = await User.findOne({ email: userInfo.email })
    if (!user) {
        return res.status(401).json({ msg: "Invalid Credentials!!", success: false })
    }
    bcrypt.compare(userInfo.password, user.password, function (err, result) {
        if (!result) {
            return res.status(401).json({ msg: "Invalid credentials", success: false })
        }
        
        const token = jwt.sign({ email: userInfo.email }, 'secret');
        res.cookie("token", token)
        res.status(200).json({ msg: "Logged IN !!", success: true })
    });
})


app.get("/verify", express.json(), (req, res) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({msg: "No token supplied", success:false})
    }
    jwt.verify(token, 'secret', async function (err, decoded) {
        if(err){
            return res.status(401).json({ msg: "Invalid token", error: err, success: false });
        }
        const userMail = decoded.email

        const user = await User.find({email: userMail})
        if(!user){
            return res.status(401).json({ msg: "no user found", success: false})
        }
        res.status(200).json({ msg: "you can access freely", success: true})
    });
})

app.get("/quotes", (req, res) => {
    const token = req.cookies.token
    console.log(token)
    if(!token){
        return res.status(401).json({msg: "No token supplied", success:false})
    }
    jwt.verify(token, 'secret', async function (err, decoded) {
        if(err){
            return res.status(401).json({ msg: "Invalid token", error: err, success: false });
        }
        const user = decoded.email

        const quotes = await Quote.find({email: user})
        const data =  quotes.map(quote=>{
            return quote.quote
        })
        res.status(200).json({ msg: "you can access freely", data: data, success: true})
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
