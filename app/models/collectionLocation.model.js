const mongoose = require('mongoose');

const collectionLocationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    County: { type: String, required: true },
    description: { type: String, required: true },
    collectionCenters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollectionCenter'
    }]
});

module.exports = mongoose.model('CollectionLocation', collectionLocationSchema);