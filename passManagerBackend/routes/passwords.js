import express from "express"
const router = express.Router()
import { Password } from "../models/Password.js"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
const secret = "secret"


function verifier(req, res, next) {
    console.log("REcived VERification req @ middleware")
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ msg: "No token supplied", success: false })
    }
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({ msg: "Invalid token", success: false })
        }
        req.email = decoded.email
        console.log("verfied")
        next()
    });
}

router.use(cookieParser())
router.use(verifier)

// define the home page route
router.get('/passes', async (req, res) => {
    console.log("recived GET req @ /password/passes")
    let passwords = await Password.find({ email: req.email })
    res.status(200).json({ passwords, success: true })
})

router.get('/delete', express.urlencoded(), async (req, res) => {
    console.log("Recieved GET req @ /passwords/delete")
    const todelete = req.query.id
    const deletedUser = await Password.findByIdAndDelete(todelete);
    if (deletedUser) {
        res.status(200).json({msg: "Password removed", success:true});
    } else {
        res.status(401).json({msg: "internal server error", success: false})
    }
})


router.post('/add', express.json(), async (req, res) => {
    console.log("Recieved POST req @ /passwords/add")
    const data = req.body
    const password = Password({
        url: data.url,
        userName: data.userName,
        password: data.password,
        email: req.email
    })

    let addedObj = await password.save()
    console.log(addedObj)

    res.status(200).json({ msg: "Password saved successfully", success: true, id: addedObj.id })
})


export default router;
