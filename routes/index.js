const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = require('../bin/models/user/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', {
		title: 'OCS'
	});
});

router.get('/logout', function(req, res, next) {
	req.logOut();
	res.redirect('/');
});

passport.use(
	new LocalStrategy(async function(username, password, done) {
		user.authenticate(username, password)
			.then(res => {
				done(null, res);
			})
			.catch(err => {
				done(err);
			});
	})
);

passport.serializeUser(function(currentUser, done) {
	done(null, currentUser.username);
});

passport.deserializeUser(function(id, done) {
	user.findByUsername(id)
		.then(res => {
			return done(null, res.username);
		})
		.catch(err => {
			return done(reason);
		});
});

router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/mongoose/jobsheet/view/14',
		failureRedirect: '/'
	}),
	function(req, res, next) {
		res.redirect('/mongoose/jobsheet/14');
	}
);

module.exports = router;
