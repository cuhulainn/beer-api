const express = require('express');
const mongoose = require('mongoose');
const app = express();

console.log("Firing up the beers api!");

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

// app.use listens for any type of requests
// app.get listens for only get requests
app.get('/hello', (req, res) => {
    console.log("Got a request");
    res.send("<h1>Hello, world!</h1>");
});
