// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemcontroller');

router.get('/itemdetails/:lot_no', itemController.getItemByLotNo);

module.exports = router;
