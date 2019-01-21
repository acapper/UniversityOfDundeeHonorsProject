const express = require('express');
const router = express.Router();
const config = require('../config');
const layout = require('../job-sheet-layout');
const db = require('../bin/database');

const uri = config.database.connection;
const dbname = config.database.name;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('jobsheet', {
		title: 'OCS',
		name: 'Job Sheet Name',
		layout: layout.template
	});
});

router.post('/', function(req, res, next) {
	console.log(req.body.id);
	const jobsheet = req.body.jobsheet;
	db.connect(uri).then(
		result => {
			db.insert(result, dbname, 'JobSheets', jobsheet).then(
				result => {
					res.send({ success: true });
				},
				reason => {
					res.send({ success: false });
					console.log(reason);
				}
			);
		},
		reason => {
			res.send({ success: false });
		}
	);
});

router.get('/all', function(req, res, next) {
	db.connect(uri).then(
		result => {
			db.find(result, dbname, 'JobSheets', {}).then(
				result => {
					res.render('jobsheets', { jobsheets: result });
				},
				reason => {
					res.render('error', { error: { message: reason } });
				}
			);
		},
		reason => {
			res.render('error', { error: { message: reason } });
		}
	);
});

module.exports = router;
