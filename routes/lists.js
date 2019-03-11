const express = require('express');
const router = express.Router();

const dbcollectionjobs = 'Jobsheets';
const dbjobsheets = require('../bin/database-jobsheets');

router.use(function timeLog(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/');
	}
});

router.get('/parts', function(req, res, next) {
	dbjobsheets.getAll(dbcollectionjobs).then(
		result => {
			var parts = [];
			for (var i = 0; i < result.length; i++) {
				try {
					for (var j = 0; j < result[i].data.parts.length; j++) {
						parts.push({
							id: result[i]._id,
							index: j,
							data: result[i].data.parts[j].data
						});
					}
				} catch (e) {}
			}
			res.render('parts', {
				title: 'OCS',
				user: req.user,
				parts: parts
			});
		},
		reason => {
			res.render('error', { message: reason });
		}
	);
});

router.get('/sitevisits', function(req, res, next) {
	dbjobsheets.getAll(dbcollectionjobs).then(
		result => {
			var sites = [];
			for (var i = 0; i < result.length; i++) {
				try {
					for (var j = 0; j < result[i].data.sitevisits.length; j++) {
						sites.push({
							id: result[i]._id,
							index: j,
							customer: result[i].data.customerdetailsname.value,
							data: result[i].data.sitevisits[j].data
						});
					}
				} catch (e) {}
			}
			res.render('sites', {
				title: 'OCS',
				user: req.user,
				sites: sites
			});
		},
		reason => {
			res.render('error', { message: reason });
		}
	);
});

module.exports = router;
