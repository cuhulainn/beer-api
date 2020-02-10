const express = require('express');
const mongoose = require('mongoose');
const beerRouter = require('./routes/beerRouter');

const app = express();

app.use(express.urlencoded({ extended: true }));

console.log("Firing up the beers api!");

app.use('/api/v1/beers', beerRouter);

const db = mongoose.connect('mongodb+srv://cjm:cjm0423@cluster0-iokn4.mongodb.net/test?retryWrites=true&w=majority',  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: "beers"
});

mongoose.connection.on('connected', () => {
    console.log('Connected to beers database. :)');
    app.listen(4444, () => {
        console.log(`Listening on port 4444`);
    });
});

mongoose.connection.on('error', () => {
    console.log('Error connecting to database :(');
    process.exit(1);
});

