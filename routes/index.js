var express = require('express');
var router = express.Router();
var config = require('../config');
var dbget = require('../bin/database-get');

var MongoClient = require('mongodb').MongoClient;
var uri = config.database.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
	MongoClient.connect(
		uri,
		{ useNewUrlParser: true },

		function(err, client) {
			if (err) throw err;

			var dbQuery1 = dbget.queryDatabase(
				client,
				'HonorsProject',
				'JobSheets',
				{
					tags: 'parts'
				}
			);

			var dbQuery2 = dbget.queryDatabase(
				client,
				'HonorsProject',
				'JobSheets',
				{
					tags: 'site visit'
				}
			);

			Promise.all([dbQuery1, dbQuery2])
				.then(dbQueryR => {
					res.render('index', {
						title: 'OCS',
						lists: [
							{ tag: 'parts', jobsheets: dbQueryR[0] },
							{ tag: 'site visit', jobsheets: dbQueryR[1] }
						]
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
