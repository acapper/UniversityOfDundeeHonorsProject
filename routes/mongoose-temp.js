const express = require('express');
const router = express.Router();
const jobsheet = require('./jobsheet/jobsheet');
const part = require('./jobsheet/part');
const site = require('./jobsheet/site');
const jobsheetModel = require('../bin/models/jobsheet/jobsheet');

router.use('/jobsheet', jobsheet);
router.use('/jobsheet/part', part);
router.use('/jobsheet/site', site);

router.get('/', function(req, res, next) {
	console.log('here');
	res.send('got it');
});

router.get('/all', function(req, res, next) {
	jobsheetModel.all().then(docs => {
		res.render('mongoose/all', {
			title: 'OCS',
			jobsheets: docs
		});
	});
});

module.exports = router;
