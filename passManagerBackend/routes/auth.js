import express from "express"
import mongoose from 'mongoose';
import { User } from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParse from "cookie-parser"

const router = express.Router()
const secret = "secret"
await mongoose.connect('mongodb://127.0.0.1:27017/passManager');

router.use(cookieParse())


// define the login page route
router.post('/login', express.json(), async (req, res) => {
    console.log("Recived POST req at /auth/login")
    let { email, password } = { ...req.body }

    let found = await User.findOne({ email: email })
    console.log(found)
    if (!found) {
        return res.status(400).json({ msg: "No user found", success: false })
    }

    bcrypt.compare(password, found.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: found.email, name: found.name }, secret);
            res.cookie("token", token)
            let userInfo = {name: found.name}
            console.log(userInfo)
            return res.status(200).json({ msg: "Logged in succesfully", success: true, userInfo: {name: found.name} })
        }
        return res.status(401).json({ msg: "Invalid password", success: false })
    });

})

// define the signup page route
router.post('/signup', express.json(), async (req, res) => {
    console.log("recived POST req at /auth/signup")
    console.log(req.body)
    let { name, email, password } = { ...req.body }

    if (email) {
        let found = await User.findOne({ email: email })
        if (found) {
            return res.status(400).json({ msg: "User already exists", success: false })
        }
    }

    if (name == "" || email == "" || password == "") {
        return res.status(400).json({ msg: "Fill all details", success: false })
    }

    bcrypt.hash(password, 10, async function (err, hash) {
        let newUser = new User({
            name,
            email,
            password: hash
        })
        let result = await newUser.save()
        return res.status(200).json({ msg: "User regisred succefluly", success: true })
    });

})

router.get("/verify", (req, res) => {
    console.log("Recived GET req at /auth/verify")
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ msg: "No token supplied", success: false })
    }
    jwt.verify(token, secret, function (err, decoded) {
        if(err){
            return res.status(401).json({msg: "Invalid token", success: false})
        }
        console.log(decoded)
        return res.status(200).json({msg: "User verified", success: true, userInfo: {name: decoded.name}})
    });
})

export default router;