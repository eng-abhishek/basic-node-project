const express = require('express');

const router = express.Router();

const {getData,createData} = require('../controllers/UserController');

router.get('/get-user',getData);

router.post('/create-user',createData);

module.exports = router;