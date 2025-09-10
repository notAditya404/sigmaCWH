import express from 'express'
import mongoose from 'mongoose';
import { Password } from './models/Password.js';
import cors from 'cors'

const app = express()
const port = 3000
app.use(cors({
  origin: "http://localhost:5173",  // allow frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/passManager');

app.get('/passes', async (req, res) => {
  let data = await Password.find()
  console.log("recived get req")
  res.json(data)
})


app.get('/delete', express.urlencoded(), async (req, res) => {
  console.log("Recieved req at delete")
  const todelete = req.query.id
  const deletedUser = await Password.findByIdAndDelete(todelete);
  if (deletedUser) {
    res.send(`User deleted: ${deletedUser}`);
  } else {
    res.send('User not found.');
  }
})

app.post('/add', express.json() , async (req, res) => {
  const data = req.body
  const password = Password({
            url: data.url,
            user: data.user,
            pass: data.pass
        })
  let addedObj = await password.save()
  console.log(addedObj.id)
  console.log(req.body)
  res.send(addedObj.id)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
