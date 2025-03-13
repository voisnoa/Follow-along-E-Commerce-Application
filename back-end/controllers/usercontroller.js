
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: 'User already exists' });
        }   
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error creating user' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

        res.status(200).json({ message: "Login successful", email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error logging in" });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching users' });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { userEmail } = req.query;

        // Check if userEmail is provided
        if (!userEmail) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Find user by email (assuming 'user' is your MongoDB model)
        const thisUser = await user.findOne({ email: userEmail });

        // If no user is found, return a 404
        if (!thisUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return name, email, and _id
        const userData = {
            name: thisUser.name,
            email: thisUser.email,
            _id: thisUser._id, // Add the _id to the response
        };

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
};

module.exports = { createUser, loginUser, getUsers,getUserByEmail };