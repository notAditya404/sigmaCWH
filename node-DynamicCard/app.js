const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src')))
console.log(path.join(__dirname, 'src'))

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
