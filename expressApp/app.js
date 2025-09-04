const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log("RECEIVED GET req at /")
  res.render("index")
})

app.post('/', express.json() , (req, res) => {
  console.log("RECEIVED POST req at /")
  console.log(req.body)
  res.send("submitted")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})