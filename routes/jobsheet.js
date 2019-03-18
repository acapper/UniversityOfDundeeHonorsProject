const express = require('express');
const router = express.Router();
const jobsheet = require('./jobsheet/jobsheet');
const part = require('./jobsheet/part');
const site = require('./jobsheet/site');

router.use('/', jobsheet);
router.use('/part', part);
router.use('/site', site);

module.exports = router;
