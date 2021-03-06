// require express, cors, mongodb and dotenv to secure database pass
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();



// declare app and port
const app = express();
const port = process.env.PORT || 5000;



// use middleware
app.use(cors());
app.use(express.json());




// connect with mongo database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zioi5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// set connection function

async function run() {
    try {
        await client.connect();

        // tasks collection
        const taskCollection = client.db("to_do_app").collection("tasks");



        // tasks collection API


        // Make API : get all task data from server

        app.get('/tasks', async (req, res) => {
            const email = req.query.email;
            const query = { email };
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })


        // POST task : add a new task

        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            res.send(result);
        })


        // delete data : delete a specific task data

        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await taskCollection.deleteOne(query);
            res.send(result);
        })


    }
    finally {
        // client.close();
    }
}


run().catch(console.dir);




// Make API : check server root
app.get('/', (req, res) => {
    res.send('Task Tracker server is running');
})


// listening port
app.listen(port, () => {
    console.log('Task Tracker is listening', port);
})