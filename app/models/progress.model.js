const mongoose = require('mongoose');

const progressSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    expense: { type: Number, required: false },
    income: { type: Number, required: false }
});

module.exports = mongoose.model('Progress', progressSchema);