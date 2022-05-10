// @ts-ignore
const express = require('express');
const isAliveCtrl = require('../controllers/isAlive');

// @ts-ignore
const router = express.Router();
router.get('/', isAliveCtrl.isAlive);
module.exports = router;
