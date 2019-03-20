const express = require('express');
const router = express.Router();
const part = require('../../bin/models/part/part');
const partTemplate = require('../../bin/models/part/part-template');

router.get('/blank', function(req, res, next) {
	res.render('jobsheet/singlepart', {
		title: 'OCS',
		partTemplate: partTemplate
	});
});

router.get('/all', function(req, res, next) {
	part.onOrder().then(doc => {
		res.render('parts', {
			title: 'OCS',
			parts: doc
		});
	});
});

router.get('/insert', function(req, res, next) {
	var data = { name: 'part', purchased: Date.now(), cost: 20 };
	part.new(data)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	part.findOne(id)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

router.post('/update/:id', function(req, res, next) {
	var id = String(req.params.id).replace(/['"]+/g, '');
	const data = req.body.data;
	console.log(id, data);
	if (data && id) {
		part.update(id, data)
			.then(doc => {
				res.json(doc);
			})
			.catch(err => {
				console.log(err.message);
				res.send(err.message);
			});
	} else {
		res.send('Data or id is null');
	}
});

router.get('/delete/:id', function(req, res, next) {
	var id = req.params.id;
	part.delete(id)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

module.exports = router;
