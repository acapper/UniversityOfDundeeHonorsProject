const express = require('express');
const router = express.Router();

const layout = require('../templates/job-sheet-layout');
const partlayout = require('../templates/part-layout');
const sitevisitlayout = require('../templates/sitevisit-layout');

const dbcollectionjobs = 'Jobsheets';
const dbcollectionstaff = 'Staff';
const dbjobsheets = require('../bin/database-jobsheets');
const dbstaff = require('../bin/database-staff');

const fs = require('fs');
const path = require('path');

router.use(function timeLog(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/');
	}
});

router.get('/view/:id', function(req, res, next) {
	var id = req.params.id;
	var jobs = dbjobsheets.get(dbcollectionjobs, {
		_id: id
	});

	var staff = dbstaff.getAll(dbcollectionstaff);

	Promise.all([jobs, staff]).then(
		result => {
			res.render('jobsheet', {
				title: 'OCS',
				name: 'Job Sheet Name',
				layout: layout.template,
				jobsheet: result[0][0],
				partlayout: partlayout.template,
				sitevisitlayout: sitevisitlayout.template,
				staff: result[1],
				user: req.user
			});
		},
		reason => {
			res.render('error', { message: reason });
		}
	);
});

router.get('/all', function(req, res, next) {
	dbjobsheets.getAll(dbcollectionjobs).then(
		result => {
			res.render('all-jobsheets', {
				title: 'OCS',
				jobsheets: result,
				user: req.user
			});
		},
		reason => {
			res.render('error', { message: reason });
		}
	);
});

router.get('/new', function(req, res, next) {
	var staff = dbstaff.getAll(dbcollectionstaff);
	Promise.all([staff]).then(
		result => {
			res.render('jobsheet', {
				title: 'OCS',
				name: 'Job Sheet Name',
				layout: layout.template,
				staff: result[0],
				user: req.user
			});
		},
		reason => {
			res.render('error', { message: reason });
		}
	);
});

router.post('/new', function(req, res, next) {
	const id = req.body.id;
	const jobsheet = req.body.jobsheet;

	if (jobsheet.data.duedate.value != null)
		jobsheet.data.duedate.value = new Date(jobsheet.data.duedate.value);

	var success = result => {
		console.log(result);
		console.log('Success');
		if (id == null || id == '') {
			res.send({ success: true, id: result.ops[0]._id });
		} else {
			res.send({ success: true });
		}
	};

	var fail = reason => {
		console.log('Fail');
		console.log(reason);
		res.render('error', { message: reason });
	};

	var promise = null;
	if (id == null || id == '') {
		var filePath = path.join(__dirname, '../job-number.txt');
		fs.readFile(filePath, 'utf8', function(err, data) {
			if (err) {
				return console.log(err);
			}
			console.log('New');
			promise = dbjobsheets
				.new(dbcollectionjobs, {
					_id: data,
					modified: new Date(),
					created: new Date(),
					data: jobsheet.data
				})
				.then(
					result => {
						success(result);
					},
					reason => {
						fail(reason);
					}
				);
			fs.writeFile(filePath, parseInt(data) + 1, function(err) {
				if (err) return console.log(err);
				console.log(parseInt(data) + 1 + ' > ' + filePath);
			});
		});
	} else {
		console.log('Updating');
		promise = dbjobsheets
			.update(
				dbcollectionjobs,
				{
					_id: id
				},
				{ $set: { modified: new Date(), data: jobsheet.data } }
			)
			.then(
				result => {
					success(result);
				},
				reason => {
					fail(reason);
				}
			);
	}
});

router.get('/delete/:id', function(req, res, next) {
	const id = req.params.id;

	dbjobsheets
		.delete(dbcollectionjobs, {
			_id: id
		})
		.then(
			result => {
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

	var q = {};

	if (search != null && search != '') {
		q['$text'] = {
			$search: search,
			$diacriticSensitive: true
		};
	}
	if (due != null && due != '') {
		var dates = due.replace(/ /g, '').split('-');
		q['data.duedate.value'] = {
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

	dbjobsheets.get(dbcollectionjobs, q).then(
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

router.get('/label', function(req, res, next) {
	const id = req.query.id;
	dbjobsheets
		.get(dbcollectionjobs, {
			_id: id
		})
		.then(
			result => {
				res.render('label', {
					jobsheet: result[0]
				});
			},
			reason => {
				res.render('error', { message: reason });
			}
		);
});

module.exports = router;
