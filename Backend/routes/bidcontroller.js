// routes/bidItemRoutes.js
const express = require('express');
const router = express.Router();
const bidItemController = require('../controllers/bidcontroller');

router.put('/items', bidItemController.updateItemStatus);
router.get('/biditems', bidItemController.getBidItems);
router.post('/lots/:lot_no/bids', bidItemController.createBid);

module.exports = router;