const express = require('express');

const { createUser, getUsers, loginUser, getUserById , getUserByEmail} = require('../controllers/usercontroller');

let userRouter = express.Router();


userRouter.post('/signup', createUser);
userRouter.get('/users', getUsers);
userRouter.post('/login', loginUser);
userRouter.get('/:id', getUserById);
userRouter.get('/', getUserByEmail);



module.exports = userRouter;