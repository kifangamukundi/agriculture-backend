const mongoose = require('mongoose');

const collectionCenterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: Number, required: false },
    isFull: { type: Boolean, default: false },
});

module.exports = mongoose.model('CollectionCenter', collectionCenterSchema);