const express = require('express');
const router = express.Router();

const layout = require('../templates/job-sheet-layout');
const partlayout = require('../templates/part-layout');
const sitevisitlayout = require('../templates/sitevisit-layout');

const mongo = require('mongodb');
const dbcollection = 'Jobsheets';
const dbjobsheets = require('../bin/database-jobsheets');

router.get('/view/:id', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	dbjobsheets
		.get(dbcollection, {
			_id: id
		})
		.then(
			result => {
				res.render('jobsheet', {
					title: 'OCS',
					name: 'Job Sheet Name',
					layout: layout.template,
					jobsheet: result[0],
					partlayout: partlayout.template,
					sitevisitlayout: sitevisitlayout.template
				});
			},
			reason => {
				console.log(reason);
				res.render('error', { message: reason });
			}
		);
});

router.get('/all', function(req, res, next) {
	dbjobsheets.getAll(dbcollection).then(
		result => {
			res.render('all-jobsheets', { title: 'OCS', jobsheets: result });
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
		promise = dbjobsheets.new(dbcollection, {
			modified: new Date(),
			created: new Date(),
			data: jobsheet.data
		});
	} else {
		console.log('Updating');
		promise = dbjobsheets.update(
			dbcollection,
			{
				_id: new mongo.ObjectID(id)
			},
			{ $set: { modified: new Date(), data: jobsheet.data } }
		);
	}

	promise.then(
		result => {
			console.log('Success');
			if (id == null || id == '') {
				res.send({ success: true, id: result.ops[0]._id });
			} else {
				res.send({ success: true });
			}
		},
		reason => {
			console.log('Fail');
			console.log(reason);
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
		.delete(dbcollection, {
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

router.get('/search', function(req, res, next) {
	const search = req.query.search;
	const due = req.query.due;
	const created = req.query.created;
	const sitevisits = req.query.sitevisits;
	const parts = req.query.parts;
	console.log(req.query);
	//{'data.parts.1': {$exists: true}}
	//{created: {$gte: ISODate("2018-04-29T00:00:00.000Z"),$lt: ISODate("2020-05-01T00:00:00.000Z")} }

	var q = {};

	if (search != null && search != '') {
		q['$text'] = {
			$search: search,
			$diacriticSensitive: true
		};
	}
	if (due != null && due != '') {
		// Fix database
		var dates = due.replace(/ /g, '').split('-');
		q['data.duedate'] = {
			$gte: new Date(dates[0]),
			$lt: new Date(dates[1])
		};
	}
	if (created != null && created != '') {
		var dates = created.replace(/ /g, '').split('-');
		q['created'] = {
			$gte: new Date(dates[0]),
			$lt: new Date(dates[1])
		};
	}
	if (sitevisits == 'true') {
		q['data.sitevisits.0'] = { $exists: true };
	}
	if (parts == 'true') {
		q['data.parts.0'] = { $exists: true };
	}

	console.log(q);

	dbjobsheets.get(dbcollection, q).then(
		result => {
			res.render('partials/jobsheet-table', {
				jobsheets: result
			});
		},
		reason => {
			console.log(reason);
			res.render('error', { message: reason });
		}
	);
});

router.get('/part', function(req, res, next) {
	res.render('partials/part', {
		title: 'OCS',
		partlayout: partlayout.template
	});
});

router.get('/sitevisit', function(req, res, next) {
	res.render('partials/site', {
		title: 'OCS',
		sitevisitlayout: sitevisitlayout.template
	});
});

module.exports = router;
