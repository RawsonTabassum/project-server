const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.htyzaba.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const routineCollection = client.db('ruet_transport').collection('routine');
        const busCollection = client.db('ruet_transport').collection('bus_info');
        const bookingCollection = client.db('ruet_transport').collection('booking');
        const employeeCollection = client.db('ruet_transport').collection('employee');

        app.get('/routine', async(req, res)=> {
            const query = {};
            const cursor = routineCollection.find(query);

            const routine = await cursor.toArray();
            res.send(routine);
        })
        app.get('/bus', async(req, res)=> {
            const query = {};
            const cursor = busCollection.find(query);

            const bus = await cursor.toArray();
            res.send(bus);
        })

        app.get('/booking', async(req, res)=> {
            const query = {};
            const cursor = await bookingCollection.find(query).toArray();
            res.send(cursor);
        })

        // app.post('/booking', async(req, res)=> {
        //     const booking = req.body;
        //     const result = await bookingCollection.insertOne(booking);
        //     res.send(result);
        // })

        
        app.get('/employee', async(req, res)=> {
            const query = {};
            const cursor = await employeeCollection.find(query).toArray();
            res.send(cursor);
        })
    }
    finally{

    }
}

app.get('/', (req, res)=> {
    res.send("working?");
})

app.listen(port, ()=> {
    console.log("Listening", port);
})

run().catch(console.dir);