// require express, cors, mongodb and dotenv to secure database pass
const express = require('express');
const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();



// declare app and port
const app = express();
const port = process.env.PORT || 5000;



// use middleware
app.use(cors());
app.use(express.json());



// Make API : check server root
app.get('/', (req, res) => {
    res.send('Task Tracker server is running');
})


// listening port
app.listen(port, () => {
    console.log('Task Tracker is listening', port);
})