const express = require('express');
const router = express.Router();
const jobsheet = require('../../bin/models/jobsheet/jobsheet');
const jobsheetTemplate = require('../../bin/models/jobsheet/jobsheet-template');

router.get('/insert', function(req, res, next) {
	res.render('mongoose/jobsheet', {
		title: 'OCS'
	});
});

router.post('/insert', function(req, res, next) {
	var data = {
		meta: { due: Date.now() },
		customer: { name: 'test' },
		sites: ['5c8d7c9653d5013b40909a42'],
		parts: ['5c8d89d2117a32152c9d7ff5']
	};
	jobsheet
		.new(data)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	jobsheet
		.findOne(id)
		.then(doc => {
			res.render('mongoose/jobsheet', {
				title: 'OCS',
				jobsheet: doc,
				jobsheetTemplate: jobsheetTemplate
			});
		})
		.catch(err => {
			res.send(err.message);
		});
});

router.get('/update/:id', function(req, res, next) {
	var id = req.params.id;
	var data = { due: Date.now(), customer: { name: 'another' } };
	jobsheet
		.update(id, data)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

router.get('/delete/:id', function(req, res, next) {
	var id = req.params.id;
	jobsheet
		.delete(id)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

module.exports = router;
