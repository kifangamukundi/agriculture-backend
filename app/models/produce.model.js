const mongoose = require('mongoose');

const produceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    // One produce many progress
    progress: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Progress"
        }
      ],
      // One produce is associated to one product
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
});

module.exports = mongoose.model('Produce', produceSchema);