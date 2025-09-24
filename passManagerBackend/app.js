import express from 'express'
import mongoose from 'mongoose';
import { Password } from './models/Password.js';
import cors from 'cors'
import authRouter from "./routes/auth.js"
import passwordsRouter from "./routes/passwords.js"

await mongoose.connect('mongodb://127.0.0.1:27017/passManager');

const app = express()
const port = 3000
app.use(cors({
  origin: "http://localhost:5173",  // allow frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use("/auth", authRouter)
app.use("/passwords", passwordsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// PATHS for simple mongoDB sit wihtout login/signup
// app.get('/passes', async (req, res) => {
//   let data = await Password.find()
//   console.log("recived get req at  passes")
//   res.json(data)
// })


// app.get('/delete', express.urlencoded(), async (req, res) => {
//   console.log("Recieved req at delete")
//   const todelete = req.query.id
//   const deletedUser = await Password.findByIdAndDelete(todelete);
//   if (deletedUser) {
//     res.send(`Password deleted: ${deletedUser}`);
//   } else {
//     res.send('Password not found.');
//   }
// })

// app.post('/add', express.json() , async (req, res) => {
//   const data = req.body
//   const password = Password({
//             url: data.url,
//             userName: data.user,
//             pass: data.pass
//         })
//   let addedObj = await password.save()
//   console.log(addedObj.id)
//   console.log(req.body)
//   res.send(addedObj.id)
// })