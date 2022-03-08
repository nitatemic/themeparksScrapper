// @ts-ignore
const express = require('express');
const waitingTimes = require('../controllers/waitingTimes');

// @ts-ignore
const router = express.Router();
router.get('/', waitingTimes.sendAllWaitingTimesToDB);
module.exports = router;
