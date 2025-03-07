const express = require('express');
const Order = require('../model/order.model');
const OrderRouter = express.Router();


OrderRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}); 
    res.send(orders); 
  } catch (error) {
    res.status(500).send(error); 
  }
});


OrderRouter.post('/create', async (req, res) => {
    try {
      const order = new Order(req.body); 
      await order.save(); 
      res.status(201).send(order); 
    } catch (error) {
      res.status(400).send(error); 
    }
  });


  OrderRouter.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id); 
      return res.status(404).send(); 
    
    res.send(order); 
  } catch (error) {
    res.status(500).send(error); 
  }
});


OrderRouter.patch('/update/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

OrderRouter.delete('/delete/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = OrderRouter;