const express = require('express');

const router = express.Router();

const upload_profile = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');

const {registerValidator,validate} = require('../middleware/validationMiddleware');

const {register, login , logout} = require('../controllers/AuthController');



router.post('/user-register', upload_profile.single('profile_image'),registerValidator,validate, register);

router.post('/user-login', login);

router.get('/user-logout',authMiddleware, logout);

module.exports = router;