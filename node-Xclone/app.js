const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'src')))


app.get('/', (req, res) => {
    console.log(`Recived ${req.method} request at ${req.path}`)
    res.render('index')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})