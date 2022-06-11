const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryImage: { type: String, required: false }
});

module.exports = mongoose.model('Category', categorySchema);