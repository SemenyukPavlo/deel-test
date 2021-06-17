const express = require('express');

const router = express.Router();

const balances = require('./balances.controller');

router.post('/deposit/:userId', balances.deposit); // userId - redundant, can we use from req.profile?

module.exports = router;
