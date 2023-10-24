const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
 
},{timestamps:true});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
