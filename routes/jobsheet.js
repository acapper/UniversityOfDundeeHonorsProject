const express = require('express');
const router = express.Router();
const jobsheet = require('./jobsheet/jobsheet');
const part = require('./jobsheet/part');
const site = require('./jobsheet/site');

router.use(function timeLog(req, res, next) {
	if (req.isAuthenticated()) {
		req.session.touch();
		return next();
	} else {
		res.redirect('/');
	}
});

router.use('/', jobsheet);
router.use('/part', part);
router.use('/site', site);

module.exports = router;
