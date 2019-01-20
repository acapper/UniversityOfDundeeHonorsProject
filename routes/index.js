var express = require('express');
var router = express.Router();
var config = require('../config');
var dbget = require('../bin/database-get');

var MongoClient = require('mongodb').MongoClient;
var uri = config.database.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'OCS'
	});
});

module.exports = router;
