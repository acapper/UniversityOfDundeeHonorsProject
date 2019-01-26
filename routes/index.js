const express = require('express');
const router = express.Router();
const config = require('../config');
const layout = require('../job-sheet-layout');
const db = require('../bin/database');
const dbjobsheets = require('../bin/database-jobsheets');
const mongo = require('mongodb');

const uri = config.database.connection;
const dbname = config.database.name;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/jobsheets/new');
});

module.exports = router;
