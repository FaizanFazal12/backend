const express = require('express');
const router = express.Router();
const Stock = require('../models/Stocks'); // Assuming this is the path to your Stock model file

// Create a new stock
router.post('/stocks', async (req, res) => {
  try {
    const { slug, price, quantity, createdBy } = req.body;
    const newStock = new Stock({ slug, price, quantity, createdBy:req.user._id });
    await newStock.save();
   return res.status(201).json(newStock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all stocks
router.get('/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find();
   return res.json(stocks);
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a single stock by ID
router.get('/stocks/:id', async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(stock);
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a stock by ID
router.put('/stocks/:id', async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
   return res.json(updatedStock);
  } catch (error) {
    console.error(error);
   return  res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a stock by ID
router.delete('/stocks/:id', async (req, res) => {
  try {
    const deletedStock = await Stock.findByIdAndDelete(req.params.id);
    if (!deletedStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
 return  res.json(deletedStock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
