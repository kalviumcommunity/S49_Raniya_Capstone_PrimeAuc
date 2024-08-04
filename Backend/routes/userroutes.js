// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.get('/users', userController.getAllUsers);
router.get('/user', userController.getUserByBidNo);

module.exports = router;
