const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const {userDashboard,userListing} = require('../controllers/UserController');

router.get('/user-dashboard',authMiddleware,userDashboard);

router.get('/user-listing',authMiddleware,userListing);

module.exports = router;