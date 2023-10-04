// const carSchema = require("./models/Car.js");
// const userSchema = require("./models/Customer.js");
// const enrollmentSchema = require("./models/Enrollments.js");

// const connectDb = require('./Data/db.js');

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');

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


const servers = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002"
]

let currentServer = 0;

// app.get('/information', async (req, res, next) => {

    

//     const response = await axios({
//         url: `${server}/information`,
//         method: method,
//         headers: headers,
//         data: body
//     });

//     res.send(response.data)

//     })

    const handler = async (req, res) =>{
 
        const server = servers[currentServer];
        currentServer = (currentServer + 1) % servers.length;

        const { method, url, headers, body } = req;
     
        try{
            
            const response = await axios({
                url: `${server}${url}`,
                method: method,
                headers: headers,
                data: body
            });


            res.send(response.data)
        }
        catch(err){
            res.status(500).send("Server error!")   
        }
    }

    app.use((req,res)=>{handler(req, res)});


    const PORT = 8000;
        app.listen(PORT, (req, res) => {
            console.log(`server is listening on PORT number ${PORT}`);
    })