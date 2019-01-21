const express = require('express');
const router = express.Router();
const config = require('../config');
const db = require('../bin/database');

const layout = require('../job-sheet-layout');

const mongo = require('mongodb');
const uri = config.database.connection;
const dbname = config.database.name;

/* GET users listing. */
router.get('/:id', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);

	db.connect(uri).then(
		result => {
			db.find(result, dbname, 'JobSheets', {
				_id: id
			}).then(
				result => {
					res.render('jobsheet', {
						title: 'OCS',
						name: 'Job Sheet Name',
						layout: layout.template,
						jobsheet: result[0]
					});
				},
				reason => {
					res.send({ success: false });
				}
			);
		},
		reason => {
			res.send({ success: false });
		}
	);
});

module.exports = router;
