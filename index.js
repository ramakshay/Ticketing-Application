const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const cors = require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

dotenv.config();

//connect to DB
mongoose.connect(
        process.env.DB_CONNECT,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err)=>{console.log("Connected to DB")}
    );
//Import Routes
const authRoute = require('./routes/auth');
const testRoute = require('./routes/testingRoute');
const ticketsRoute = require('./routes/tickets');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(express.static('public'))

//Router middleware
app.use('/api/user', authRoute);
app.use('/api/find', testRoute);
app.use('/api/tickets',ticketsRoute)


app.listen(3000, () => {
    console.log('Server running in 3000')
})