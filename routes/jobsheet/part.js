const express = require('express');
const router = express.Router();
const part = require('../../bin/models/part/part');

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

router.get('/update/:id', function(req, res, next) {
	var id = req.params.id;
	var data = { name: 'part update' };
	part.update(id, data)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			res.send(err.message);
		});
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
