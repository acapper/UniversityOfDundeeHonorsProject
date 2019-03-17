const express = require('express');
const router = express.Router();
const jobsheet = require('./jobsheet/jobsheet');
const part = require('./jobsheet/part');
const site = require('./jobsheet/site');

router.use('/jobsheet', jobsheet);
router.use('/jobsheet/part', part);
router.use('/jobsheet/site', site);

router.get('/', function(req, res, next) {
	console.log('here');
	res.send('got it');
});

module.exports = router;
