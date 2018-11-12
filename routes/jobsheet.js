var express = require('express');
var router = express.Router();
var config = require('../config');
var dbget = require('../bin/database-get');

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var uri = config.database.connection;

/* GET users listing. */
router.get('/:id', function(req, res, next) {
	var id = new mongo.ObjectID(req.params.id);
	MongoClient.connect(
		uri,
		{ useNewUrlParser: true },

		function(err, client) {
			if (err) throw err;

			var dbQuery = dbget.queryDatabase(
				client,
				'HonorsProject',
				'JobSheets',
				{
					_id: id
				}
			);

			Promise.all([dbQuery])
				.then(dbQueryR => {
					res.render('jobsheet', {
						title: 'OCS',
						jobsheet: dbQueryR[0][0]
					});
					client.close();
				})
				.catch(err => {
					throw err;
				});
		}
	);
});

module.exports = router;
