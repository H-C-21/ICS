// const carSchema = require("./models/Car.js");
// const userSchema = require("./models/Customer.js");
// const enrollmentSchema = require("./models/Enrollments.js");

// const connectDb = require('./Data/db.js');

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

// connectDb();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
  
  
  app.use(cors({
    origin: true
}))


// Enable CORS for your frontend
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,  // This allows cookies to be sent cross-origin
// }));


app.get('/information', async (req, res, next) => {
    const data = {
        name: "Harshit",
        email: "charshit200@gmail.com",
        age: 20,
        server: "Server 1"
     }
        console.log(data)
        return res.json(data)
    })


const PORT = 3000;
app.listen(PORT, (req, res) => {
        console.log(`server is listening on PORT number ${PORT}`);
})