const express = require('express');
const router = express.Router();
const site = require('../../bin/models/site/site');
const siteTemplate = require('../../bin/models/site/site-template');

router.get('/blank', function(req, res, next) {
	res.render('mongoose/singlesite', {
		title: 'OCS',
		siteTemplate: siteTemplate
	});
});

router.get('/insert', function(req, res, next) {
	var data = {
		address: { street: 'street', city: 'city', postcode: 'postcode' },
		date: Date.now(),
		time: Date.now()
	};
	site.new(data)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	site.findOne(id)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

router.get('/update/:id', function(req, res, next) {
	var id = req.params.id;
	var data = { address: { city: 'dundee' } };
	site.update(id, data)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

router.get('/delete/:id', function(req, res, next) {
	var id = req.params.id;
	site.delete(id)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
});

module.exports = router;
