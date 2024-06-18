// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);

router.put('/updatePassword', authController.updatePassword); // New route for updating password


module.exports = router;
