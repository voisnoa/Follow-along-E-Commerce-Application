require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const profileRoutes = require('./routes/profile');
const orderRoutes = require('./routes/orderRoutes');
const cors = require("cors");



const app = express();
const PORT = 8080;



app.use(cors({ 
    origin: "*", // Allow only your frontend
    methods: "GET, POST, PUT, DELETE, OPTIONS", // Allow these HTTP methods
    allowedHeaders: "Content-Type, Authorization", // Allow these headers
    credentials: true 
}));



// Handle preflight (OPTIONS) request
// app.options("*", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5174");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.sendStatus(200);
// });


// ...existing code...
// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

// MongoDB connection

console.log('MongoDB URI:', process.env.MONGODB_URI || 'MONGODB_URI is not defined');

console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);
let connection = mongoose.connect(process.env.MONGODB_URI).catch(error => {
  console.error('MongoDB connection error:', error);
});



app.get('/ping', (req, res) => {
  res.send('pong');
});

// Routes
app.use('/', userRoutes);
app.use('/', uploadRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/orders', orderRoutes);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${PORT}`);
});
