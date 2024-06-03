const express = require('express');
const router = express.Router();
const controller = require('../controllers/userbidnocontroller');

router.get('/current-userbidnos', controller.getCurrentUserbidNos);
router.post('/add-userbidno', controller.addUserbidNo);

module.exports = router;
