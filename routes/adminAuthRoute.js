const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');

const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const {adminLogin, adminLogout} = require('../controllers/admin/authController');

const {getDashboardData,getUserList,editUser, deleteUser, createFakeUsers} = require('../controllers/admin/dashboardController');

router.post('/login', adminLogin);

router.get('/logout', adminAuthMiddleware, adminLogout);

router.get('/dashboard', adminAuthMiddleware, getDashboardData);   

router.get('/users', adminAuthMiddleware, getUserList);

router.put('/users/:userId', upload.single('profile_image'), adminAuthMiddleware, editUser);

router.delete('/users/:userId', adminAuthMiddleware, deleteUser);   

router.get('/create-fake-users', adminAuthMiddleware, createFakeUsers);

module.exports = router;