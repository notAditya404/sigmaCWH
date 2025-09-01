import express from "express"
import mongoose from "mongoose"
import path from "path"
import { Employee } from "./models/Employee.js";

const app = express();
const PORT = 3000;
let conn = await mongoose.connect('mongodb://localhost:27017/company');

app.set('view engine', 'ejs');
app.use(express.static(path.join("c:\\Users\\yadav\\VS_programs\\sigmaCWH\\expressAppnMongoDB\\", 'public')));

app.get('/', async (req, res) => {
    let a = await Employee.deleteMany({name: {$eq: "Harry"}})
    console.log(a)
    console.log(`Recieved ${req.method} at ${req.url}`)
    res.render("home.ejs", { cssFiles: ['home.css'] });
});

app.get('/about', (req, res) => {
    console.log(`Recieved ${req.method} at ${req.url}`)
    res.render("about.ejs");
});

app.get('/posts', (req, res) => {
    console.log(`Recieved ${req.method} at ${req.url}`)
    res.render("posts.ejs");
});


app.get('/genrate', (req, res) => {
    genData(req, res)
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});



const availName = ["Aditya", "Samar", "Harry"]
const language = ["Python", "C++", "Javascript", "CSS"]
const city = ["Rewari", "Gurgaon", "New York"]

async function genData(req, res) {
    console.log(`Recieved ${req.method} at ${req.url}`)

    for (let i = 1; i <= 10; i++) {
        let currName = availName[Math.floor(Math.random() * availName.length)]
        let currLanguage = language[Math.floor(Math.random() * language.length)]
        let currCity = city[Math.floor(Math.random() * city.length)]
        let salary = Math.ceil(Math.random() * (1000 - 500) + 500)
        let isManager = (Math.random() > 0.5) ? true : false

        const employee = Employee({
            name: currName,
            salary: salary,
            language: currLanguage,
            city: currCity,
            isManager: isManager
        })

        await employee.save()
    }

    res.send("working API")
}