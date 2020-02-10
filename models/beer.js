const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min:[0, "Rating must be a number greater than or equal to 0."],
        max:[10, "Rating must be greater than 10."],
        required: true
    }
});

module.exports = mongoose.model('Beer', BeerSchema);