const mongoose = require('mongoose');

const countySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    countyPlaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CountyPlace'
    }]
});

module.exports = mongoose.model('County', countySchema);