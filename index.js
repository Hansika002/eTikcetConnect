const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = 8000 || process.env.PORT;
mongoose.connect(process.env.DB);
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Cors setup
const corsOptions ={
    origin:['http://localhost:3000'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

// Database Connections
const db=mongoose.connection;

db.on('error' , (error)=>
{
    console.log(error);
})
db.once('open' , ()=>
{
    console.log("Connection Succesfull with MongoDB Atlas !");
})


// Middelware
app.use(express.json());
app.use(cookieParser())


//importing Routes

const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')

//Using Routes

app.use('/auth' , userRoutes);
app.use('/ticket' , ticketRoutes)
app.get('/' , (req , res)=>{res.sendStatus(200)});


app.listen(PORT, ()=>{
    console.log(`App listed on port http://localhost:8000`);
});
