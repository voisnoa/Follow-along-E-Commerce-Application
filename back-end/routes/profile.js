const express = require('express');
const router = express.Router();
const { createProfile, getProfile } = require('../controllers/profileController');
// const { isAuthenticated } = require('../middleware/auth');

// Profile routes
router.post('/create', createProfile);
router.get('/getProfile',getProfile);

module.exports = router;