const express = require('express');
const router = express.Router();
const controller = require('../controllers/lotnocontroller');

router.get('/current-sequence', controller.getCurrentSequence);
router.post('/update-sequence', controller.updateSequence);

module.exports = router;
