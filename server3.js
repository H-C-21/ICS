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

// app.post('/login', async (req,res, next) => {

//     const user = userSchema.findOne({email: req.body.email})
//     if(user){
//         if(user.password = req.body.password){
//             return res.json('logged in')
//         }
//     }


// })


// app.get('/getcars', async (req, res, next) => {

//     const all = {}
//     const data = await carSchema.find(all);
//     console.log(data) 
//     res.json(data);

// });

// app.get('/getuserorders', async (req, res, next) => {

//     const enrollments = await enrollmentSchema.find({ user: 'harshit'})
//     return res.json(enrollments)

// });

// app.post('/setstatus', async (req, res, next) => {


// });




app.get('/information', async (req, res, next) => {
    const data = {
        name: "Harshit",
        email: "charshit200@gmail.com",
        age: 20,
        server: "Server 3"
     }
    
        return res.json(data)
    })


const PORT = 3002;
app.listen(PORT, (req, res) => {
        console.log(`server is listening on PORT number ${PORT}`);
})