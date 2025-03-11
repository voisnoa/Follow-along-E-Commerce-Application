const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userModel } = require('./model/user.model');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { productRouter } = require('./routes/product.route');
const middleware = require('./middleware/authentication');
// const {productRouter} = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const OrderRouter = require('./routes/order.route');
const cartRouter = require('./routes/cart.route');

require('dotenv').config();  
const app = express();


app.use(express.json());
app.use(cors());

let connection = mongoose.connect(process.env.mongoURL)

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.post("/create", async (req, res) => {
    let payLoad = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(payLoad.password, 10);
    payLoad.password = hashedPassword; // Replace the plain password with the hashed one

    try {
        let new_user = new userModel(payLoad);
        await new_user.save();
        res.send({ "message": "Hurray! Successfully saved the user to the database" });
    } catch (error) {
        console.log(error);
        res.send({ "error": error });
    }
});

const multer = require('multer');
const authentication = require('./middleware/authentication');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Save files in the uploads folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Add a unique identifier to avoid name conflicts
    }
});

const upload = multer({ storage: storage });

// POST route for file upload
app.post('/upload', upload.single('myFile'), (req, res) => {
    try {
        console.log('File uploaded successfully:');
        console.log(req.file); // Log the uploaded file's details

        res.status(200).send({
            message: 'File uploaded successfully',
            fileDetails: req.file // Include file details in the response
        });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).send({
            message: 'File upload failed',
            error: error.message
        });
    }
});

app.use("/product",authentication, productRouter)
app.use("/orders",authentication,OrderRouter)

app.use("/user",userRouter)
app.use("/cart",authentication, cartRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log(error);
    }

    console.log(`Server is running on port ${process.env.PORT}`);
});