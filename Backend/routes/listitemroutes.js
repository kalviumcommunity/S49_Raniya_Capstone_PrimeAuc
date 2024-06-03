// routes/listItemRoutes.js
const express = require('express');
const router = express.Router();
const listItemController = require('../controllers/listitemcontroller');
const authenticateJWT = require('../middlewares/authenticateJWT');


router.post('/items',listItemController.upload.single('image'), listItemController.listItem);

module.exports = router;
