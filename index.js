const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('colors')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// -------middleware---------
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nakjhup.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const foodCollection = client.db('fooddb').collection('foods');

app.get('/foods', async (req, res) => {
    try {
        const cursor = foodCollection.find({});
        const foods = await cursor.limit(3).toArray();
        res.send({
            success: true,
            message: "Successfully got the data",
            data: foods,
        })
    } catch (error) {
        console.log(error.name.bgRed, error.message.bold);
        res.send({
            success: false,
            error: error.message
        })
    }
})

// --------AllService ----
app.get('/service', async (req, res) => {
    try {
        const cursor = foodCollection.find({});
        const foods = await cursor.toArray();
        res.send({
            success: true,
            message: "Successfully got the data",
            data: foods,
        })
    } catch (error) {
        console.log(error.name.bgRed, error.message.bold);
        res.send({
            success: false,
            error: error.message
        })
    }
})

app.get('/service/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const foods = await foodCollection.findOne(query);
        res.send(foods);
    } catch (error) {
        console.log(error.name.bgRed, error.message.bold);
        res.send({
            success: false,
            error: error.message
        })
    }
})

app.get('/', (req, res) => {
    res.send('food server is running...')
})

app.listen(port, () => {
    console.log(`Server  is Running ${port}`.cyan.bold)
})