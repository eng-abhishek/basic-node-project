const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const {userDashboard,userListing,checkValidUser} = require('../controllers/UserController');

router.get('/check-valid-user',authMiddleware,checkValidUser);

router.get('/user-dashboard',authMiddleware,userDashboard);

router.get('/user-listing',authMiddleware,userListing);

module.exports = router;