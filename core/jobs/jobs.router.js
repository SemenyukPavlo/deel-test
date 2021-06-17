const express = require('express');

const router = express.Router();

const jobs = require('./jobs.controller');

router.get('/unpaid', jobs.unpaid);
router.post('/:jobId/pay', jobs.pay);

module.exports = router;
