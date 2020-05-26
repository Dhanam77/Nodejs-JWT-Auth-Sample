const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3000;

//const MongoClient = require('mongodb').MongoClient;   

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());


dotenv.config();
    

//To Routes Folder
const authRoute = require('./Routes/auth');
const userRoute = require('./Routes/users');


//Connecting to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to database')
);


//Will Require /api/user before @EG signup 
app.use('/api/user/', authRoute);
app.use('/api/', userRoute);


//Check get call
app.get('/', (req, res) => {
    res.send('Test GET request')
});


app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));