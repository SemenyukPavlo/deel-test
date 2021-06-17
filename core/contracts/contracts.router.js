const express = require('express');

const router = express.Router();

const contracts = require('./contracts.controller');

router.get('/:id', contracts.get);
router.get('/', contracts.list);

module.exports = router;
