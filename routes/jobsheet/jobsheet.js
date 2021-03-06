const express = require('express');
const router = express.Router();
const jobsheet = require('../../bin/models/jobsheet/jobsheet');
const user = require('../../bin/models/user/user');
const part = require('../../bin/models/part/part');
const site = require('../../bin/models/site/site');
const jobsheetTemplate = require('../../bin/models/jobsheet/jobsheet-template');
const partTemplate = require('../../bin/models/part/part-template');
const siteTemplate = require('../../bin/models/site/site-template');

var userList = [{ _id: null, username: 'None' }];
user.all()
	.then(res => {
		res.forEach(element => {
			userList.push(element);
		});
	})
	.catch(err => {
		console.log('User List Error');
		console.log(err);
	});

router.get('/', function(req, res, next) {
	res.render('jobsheet/jobsheet', {
		title: 'OCS',
		jobsheet: null,
		jobsheetTemplate: jobsheetTemplate,
		partTemplate: partTemplate,
		siteTemplate: siteTemplate,
		userList: userList,
		user: req.user
	});
});

router.get('/all', function(req, res, next) {
	jobsheet.all().then(docs => {
		res.render('jobsheet/all', {
			title: 'OCS',
			jobsheets: docs,
			user: req.user,
			users: userList
		});
	});
});

router.get('/assigned', function(req, res, next) {
	jobsheet.all().then(docs => {
		res.render('jobsheet/all', {
			title: 'OCS',
			jobsheets: docs,
			user: req.user,
			users: userList,
			check: true
		});
	});
});

var getNewIDs = (objects, type) => {
	return new Promise(function(resolve, reject) {
		var list = [];
		if (objects) {
			objects.forEach(item => {
				if (item.id != null) list.push(type.update(item.id, item.data));
				else list.push(type.new(item.data));
			});
		}
		Promise.all(list)
			.then(results => {
				var ids = [];
				results.forEach(item => {
					ids.push(item._id);
				});
				resolve(ids);
			})
			.catch(err => {
				console.log(err);
				reject(err);
			});
	});
};

var updateJobsheetID = (ids, id, type) => {
	return new Promise(function(resolve, reject) {
		try {
			ids.forEach(element => {
				type.update(element, { jobsheet: id });
			});
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

router.post('/insert', function(req, res, next) {
	const data = req.body.data;
	const parts = getNewIDs(data.parts, part);
	const sites = getNewIDs(data.sites, site);
	Promise.all([parts, sites])
		.then(results => {
			data.parts = results[0];
			data.sites = results[1];

			jobsheet
				.new(data)
				.then(doc => {
					updateJobsheetID(data.parts, doc._id, part);
					updateJobsheetID(data.sites, doc._id, site);
					res.send({ id: doc._id });
				})
				.catch(err => {
					console.log(err);
					res.send(err.message);
				});
		})
		.catch(err => {
			console.log(err);
		});
});

router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	jobsheet
		.findOne(id)
		.then(doc => {
			res.render('jobsheet/jobsheet', {
				title: 'OCS',
				jobsheet: doc,
				jobsheetTemplate: jobsheetTemplate,
				partTemplate: partTemplate,
				siteTemplate: siteTemplate,
				userList: userList,
				user: req.user
			});
		})
		.catch(err => {
			console.log(err);
			res.send(err.message);
		});
});

router.post('/update', function(req, res, next) {
	const id = req.body.id;
	const data = req.body.data;
	const parts = getNewIDs(data.parts, part);
	const sites = getNewIDs(data.sites, site);
	Promise.all([parts, sites])
		.then(results => {
			data.parts = results[0];
			data.sites = results[1];

			jobsheet
				.update(id, data)
				.then(doc => {
					updateJobsheetID(data.parts, doc._id, part);
					updateJobsheetID(data.sites, doc._id, site);
					res.send({ id: doc._id });
				})
				.catch(err => {
					console.log(err);
					res.send(err.message);
				});
		})
		.catch(err => {
			console.log(err);
		});
});

router.get('/delete/:id', function(req, res, next) {
	var id = req.params.id;
	jobsheet
		.delete(id)
		.then(doc => {
			res.redirect('/jobsheet/all');
		})
		.catch(err => {
			console.log(err);
			res.send(err.message);
		});
});

router.get('/all/search', function(req, res, next) {
	const search = req.query.search;
	const due = req.query.due;
	const created = req.query.created;
	const sitevisits = req.query.sitevisits;
	const parts = req.query.parts;
	const user = req.query.user;

	var q = {};

	if (search != null && search != '') {
		if (!isNaN(search))
			q = {
				$or: [
					{ _id: search },
					{
						$text: {
							$search: search,
							$diacriticSensitive: true
						}
					}
				]
			};
		else
			q = {
				$text: {
					$search: search,
					$diacriticSensitive: true
				}
			};
	}
	if (due != null && due != '') {
		var dates = due.replace(/ /g, '').split('-');
		q['meta.due'] = {
			$gte: new Date(dates[0]),
			$lt: new Date(dates[1])
		};
	}
	if (created != null && created != '') {
		var dates = created.replace(/ /g, '').split('-');
		q['meta.created'] = {
			$gte: new Date(dates[0]),
			$lt: new Date(dates[1])
		};
	}
	if (sitevisits == 'true') {
		q['sites.0'] = { $exists: true };
	}
	if (parts == 'true') {
		q['parts.0'] = { $exists: true };
	}
	if (user != null && user != '') {
		q['meta.assigned'] = user;
	}

	jobsheet
		.search(q)
		.then(docs => {
			res.render('jobsheet/tablesearch', {
				title: 'OCS',
				jobsheets: docs
			});
		})
		.catch(err => {
			console.log(err);
			res.send(err.message);
		});
});

module.exports = router;
