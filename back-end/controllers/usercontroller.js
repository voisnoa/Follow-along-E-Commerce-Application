const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
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

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error logging in" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(userData);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching user data' });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const  userEmail  = req.query.email;
        if (!userEmail) {
            return res.status(400).send({ error: 'Email is required' });
        }

        const userData = await User.findOne({ email: userEmail });
        if (!userData) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send({
            name: userData.name,
            email: userData.email,
            _id: userData._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching user data' });
    }
};

module.exports = { createUser, loginUser, getUsers, getUserById, getUserByEmail };