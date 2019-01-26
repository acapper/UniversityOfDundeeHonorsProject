const express = require('express');
const router = express.Router();
const config = require('../config');
const db = require('../bin/database');

const layout = require('../job-sheet-layout');

const mongo = require('mongodb');
const uri = config.database.connection;
const dbname = config.database.name;
const dbjobsheets = require('../bin/database-jobsheets');

router.get('/view/:id', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	dbjobsheets
		.get({
			_id: id
		})
		.then(
			result => {
				res.render('jobsheet', {
					title: 'OCS',
					name: 'Job Sheet Name',
					layout: layout.template,
					jobsheet: result[0]
				});
			},
			reason => {
				console.log(reason);
				res.render('error', { message: reason });
			}
		);
});

router.get('/all', function(req, res, next) {
	dbjobsheets.getAll().then(
		result => {
			res.render('jobsheets', { jobsheets: result });
		},
		reason => {
			res.render('error', { message: reason });
		}
	);
});

router.get('/new', function(req, res, next) {
	res.render('jobsheet', {
		title: 'OCS',
		name: 'Job Sheet Name',
		layout: layout.template
	});
});

router.post('/new', function(req, res, next) {
	const id = req.body.id;
	const jobsheet = req.body.jobsheet;
	var promise = null;
	if (id == null || id == '') {
		console.log('New');
		promise = dbjobsheets.new(jobsheet);
	} else {
		console.log('Updating');
		promise = dbjobsheets.update(
			{
				_id: new mongo.ObjectID(id)
			},
			{ $set: { data: jobsheet.data } }
		);
	}

	promise.then(
		result => {
			if (id == null || id == '') {
				res.send({ success: true, id: result.ops[0]._id });
			} else {
				res.send({ success: true });
			}
		},
		reason => {
			res.render('error', { message: reason });
		}
	);
});

router.get('/delete/:id', function(req, res, next) {
	const id = req.params.id;
	console.log(req);
	console.log({
		_id: id
	});

	dbjobsheets
		.delete({
			_id: new mongo.ObjectID(id)
		})
		.then(
			result => {
				//console.log(result);
				res.redirect('/jobsheets/all');
			},
			reason => {
				res.render('error', { message: reason });
			}
		);
});

module.exports = router;
