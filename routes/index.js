var express = require('express');
var router = express.Router();
var config = require('../config');

var MongoClient = require('mongodb').MongoClient;
var uri = config.database.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
	MongoClient.connect(
		uri,
		{ useNewUrlParser: true },
		function(err, client) {
			if (err) throw err;
			var dbo = client.db('HonorsProject');
			var query = { 'customer.lastname': 'Black' };
			const collection = dbo
				.collection('JobSheets')
				.find(query)
				.toArray(function(err, result) {
					if (err) throw err;
					res.render('index', { title: 'Express', result });
				});
			client.close();
		}
	);
});

module.exports = router;
