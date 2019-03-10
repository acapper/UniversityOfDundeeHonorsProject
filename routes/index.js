const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbstaff = require('../bin/database-staff');
const dbcollectionstaff = 'Staff';
const ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.redirect('/jobsheets/new');
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
		dbstaff.getOne({ username }, dbcollectionstaff).then(
			result => {
				if (result) {
					bcrypt.compare(password, result.password, function(
						err,
						compare
					) {
						if (compare === true) {
							return done(null, result);
						} else {
							return done(err);
						}
					});
				} else {
					return done(new Error('User not found'));
				}
			},
			reason => {
				return done(reason);
			}
		);
	})
);

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(id, done) {
	dbstaff.getOne({ username: id }, dbcollectionstaff).then(
		result => {
			return done(null, result.username);
		},
		reason => {
			return done(reason);
		}
	);
});

router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/jobsheets/all',
		failureRedirect: '/'
	}),
	function(req, res, next) {
		res.redirect('/jobsheets/all');
	}
);

module.exports = router;
