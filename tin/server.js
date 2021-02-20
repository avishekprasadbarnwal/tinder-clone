import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors';

import Cards from './dbCards.js'

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://user:avi123@cluster0.464hf.mongodb.net/tinderdb?retryWrites=true&w=majority'

// Middleware
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database Connected successfully")
})
.catch((err) => {
    console.log(`Could not connect to the server ${err}`)
})

// API Endpoints

// Getting tye data from our database
app.get('/', (req, res) => {
    res.send('This is the server check')
})

// Pushing the data into our database
app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;

    // Creating a new card
    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/card', (req, res) => {

    // Finding a new card that is present in our database
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


// Listener
app.listen(port, () => {
    console.log(`listening on localhost ${port}`)
});

