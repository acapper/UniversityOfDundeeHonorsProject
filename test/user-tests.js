const user = require('../bin/models/user/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

describe('User Tests', function() {
	var id = null;
	describe('Insert', function() {
		it('Should successfully insert one new user', function(done) {
			user.new({ username: 'testuser', password: 'test' })
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done(err);
				});
		});

		it('Should fail since user is incorrect', function(done) {
			user.new({ username: 'testuser' })
				.then(res => {
					done('Should fail');
				})
				.catch(err => {
					done();
				});
		});

		it('Should fail since user is null', function(done) {
			user.new(null)
				.then(res => {
					done('Should fail');
				})
				.catch(err => {
					done();
				});
		});
	});

	describe('Update', function() {
		it('Response and updated should be equal', function(done) {
			if (!id) done('Insert Failed');
			const update = { username: 'updated', password: 'updated' };
			user.update(id, update)
				.then(res => {
					if (res.username == update.username)
						bcrypt.compare(update.password, res.password, function(
							err,
							res
						) {
							if (err) done(err);
							done();
						});
					else done('Document not correctly updated');
				})
				.catch(err => {
					done(err);
				});
		});

		it('Should fail since id is not found', function(done) {
			var tid = new mongoose.mongo.ObjectId();
			const update = { username: 'updated', password: 'updated' };
			user.update(tid, update)
				.then(res => {
					done('Should Fail');
				})
				.catch(err => {
					done();
				});
		});

		it('Should fail since id incorrect format', function(done) {
			var tid = 'not an id';
			const update = { username: 'updated', password: 'updated' };
			user.update(tid, update)
				.then(res => {
					done('Should Fail');
				})
				.catch(err => {
					done();
				});
		});

		it('Should fail since id is null', function(done) {
			var tid = null;
			const update = { username: 'updated', password: 'updated' };
			user.update(tid, update)
				.then(res => {
					done('Should Fail');
				})
				.catch(err => {
					done();
				});
		});
	});

	describe('Delete', function() {
		it('Should delete user with id', function(done) {
			if (!id) done('Insert Failed');
			user.delete(id)
				.then(res => {
					if (String(res._id) == String(id)) done();
					else done('Incorrect user');
				})
				.catch(err => {
					done(err);
				});
		});

		it('Should fail since id is not found', function(done) {
			var tid = new mongoose.mongo.ObjectId();
			user.delete(tid)
				.then(res => {
					done(res);
				})
				.catch(err => {
					done();
				});
		});

		it('Should fail since id incorrect format', function(done) {
			var tid = 'not an id';
			user.delete(tid)
				.then(res => {
					done('Should fail');
				})
				.catch(err => {
					done();
				});
		});

		it('Should fail since id is null', function(done) {
			var tid = null;
			user.delete(tid)
				.then(res => {
					done('Should fail');
				})
				.catch(err => {
					done();
				});
		});
	});

	describe('Authenticate', function() {
		var aid = null;
		before(done => {
			user.new({ username: 'testuser', password: 'test' })
				.then(res => {
					aid = res._id;
					done();
				})
				.catch(err => {
					done('Authenticate before failed');
				});
		});

		after(done => {
			user.delete(aid)
				.then(res => {
					done();
				})
				.catch(err => {
					done('Authenticate after failed');
				});
		});

		it('Successful authentication', function(done) {
			user.authenticate('testuser', 'test')
				.then(res => {
					if (res) done();
					else done('Should pass');
				})
				.catch(err => {
					done(err);
				});
		});

		it('Incorrect password', function(done) {
			user.authenticate('testuser', 'incorrect')
				.then(res => {
					if (res) done('Should fail');
				})
				.catch(err => {
					done();
				});
		});

		it('Incorrect username', function(done) {
			user.authenticate('incorrect', 'test')
				.then(res => {
					if (res) done('Should fail');
				})
				.catch(err => {
					done();
				});
		});

		it('Null password', function(done) {
			user.authenticate('testuser', null)
				.then(res => {
					if (res) done('Should fail');
					else done();
				})
				.catch(err => {
					done();
				});
		});

		it('Null username', function(done) {
			user.authenticate(null, 'test')
				.then(res => {
					if (res) done('Should fail');
					else done();
				})
				.catch(err => {
					done();
				});
		});
	});
});
