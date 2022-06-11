const mongoose = require('mongoose');

const produceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    progress: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Progress"
        }
      ]
});

module.exports = mongoose.model('Produce', produceSchema);