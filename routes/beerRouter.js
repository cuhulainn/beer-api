const express = require('express');
const beerRouter = express.Router();
const Beer = require('../models/beer');

beerRouter.post('/', (req, res) => {
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

beerRouter.get('/', (req, res) => {
    Beer.find((err, beers) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(beers);
        };
    });
});

// :beer_id in the route needs to match the find by ID req.params.xxxx
beerRouter.get('/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(beer);
        };
    });
});

beerRouter.put('/:beer_id', (req, res) => {
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

beerRouter.delete('/:beer_id', (req, res) => {
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

// beerRouter.use listens for any type of requests
// beerRouter.get listens for only get requests, etc.
// beerRouter.get('/hello', (req, res) => {
//     console.log("Got a request");
//     res.send("<h1>Get me a beer!</h1>");
// });

module.exports = beerRouter;