// @ts-ignore
const express = require('express');
const isAliveCtrl = require('../controllers/isAlive');
const DBActions = require('../utilis/DBActions')

// @ts-ignore
const router = express.Router();
router.get('/', DBActions.checkConnection, isAliveCtrl.isAlive);
module.exports = router;
