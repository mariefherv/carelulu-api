const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
dotenv.config();

const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    passowrd : '',
    database: 'tasks'
});

// Connect to MySQL Database
db.connect((err) => {
    if(err) console.log("Unable to connect to MySQL");
    
    console.log('Connected to MySQL.')
})

module.exports = db; //export connection

// for task routes
const taskRoutes = require('./routes/taskRoutes')
app.use('/task',taskRoutes);

// for user routes
const userRoutes = require('./routes/userRoutes')
app.use('/user',userRoutes);


app.listen(port,()=>console.log(`App is running on localhost:${process.env.PORT}`))