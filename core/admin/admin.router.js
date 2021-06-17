const express = require('express');

const router = express.Router();

const admin = require('./admin.controller');

router.get('/best-profession', admin.bestProfession);
router.get('/best-clients', admin.bestClients);

module.exports = router;
