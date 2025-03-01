const express = require('express');
const { userModel } = require('../model/user.model');

let userRouter = express.Router();

userRouter.get('/profile', async(req, res) => {
    const {userID} = req.body.userID;
    try {
        const user = await userModel.findById(userID);
        if(!user) {
            return res.status(404).send({message: "User not found"});
        }
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Internal server error"});
    }
}) ;

module.exports = userRouter;