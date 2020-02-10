const express = require('express');
const mongoose = require('mongoose');
const Beer = require('./models/beer')

const app = express();

app.use(express.urlencoded({ extended: true }));

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

app.post('/beers', (req, res) => {
    let beer = new Beer();
    beer.name = req.body.name;
    beer.rating = req.body.rating;
    beer.save((err, beer) => {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.send(`Saved your ${beer}`)
        };

    });
});

app.get('/beers', (req, res) => {
    Beer.find((err, beers) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(beers);
        };
    });
});

// :beer_id in the route needs to match the find by ID req.params.xxxx
app.get('/beers/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(beer);
        };
    });
});

app.put('/beers/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if (err) {
            res.status(500).send(err);
        } else {
            beer.name = req.body.name;
            beer.rating = req.body.rating;
            beer.save((err, beer) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(`Beer posted!\n ${beer}`);
                };
            });
        };
    });
});

app.delete('/beers/:beer_id', (req, res) => {
    Beer.deleteOne({
        _id: req.params.beer_id
    }, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(`Successfully deleted beer with ID: ${req.params.beer_id}`)
        };
    });
});

// app.use listens for any type of requests
// app.get listens for only get requests
// app.get('/hello', (req, res) => {
//     console.log("Got a request");
//     res.send("<h1>Get me a beer!</h1>");
// });
