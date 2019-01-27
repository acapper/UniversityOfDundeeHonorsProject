const expect = require('chai').expect;
const assert = require('chai').assert;

const db = require('../bin/database');
const config = require('../config');

let uri = null;
if (config.database.travis == false) {
	uri = config.database.connection;
} else {
	uri = 'mongodb://travis:test@127.0.0.1/HonorsProject';
}

describe('Database Tests', function() {
	describe('Connection', function() {
		it('Database connection should produce no errors', function(done) {
			db.connect(uri).then(
				result => {
					expect(result).not.to.equal(null);
					result.close().then(done());
				},
				reason => {
					done(reason);
				}
			);
		});

		it('Database connection should fail', function(done) {
			db.connect('uri').then(
				result => {
					result
						.close()
						.then(
							done(
								new Error(
									'Connection should not be established'
								)
							)
						);
				},
				reason => {
					expect(reason).not.to.equal(null);
					done();
				}
			);
		});
	});

	describe('Needs a connection', function() {
		let con = null;
		const obj1 = {
			name: 'obj1',
			test: 'This is a test object',
			something: 'This is obj1',
			random: Math.random()
		};

		const obj2 = {
			name: 'obj2',
			test: 'This is a test object',
			something: 'This is obj2',
			random: Math.random()
		};

		before(done => {
			db.connect(uri).then(
				result => {
					con = result;
					return db
						.deleteMany(con, 'HonorsProject', 'Test', {})
						.then(() => done());
				},
				reason => done(reason)
			);
		});

		beforeEach(done => {
			var p1 = db.insert(con, 'HonorsProject', 'Test', obj1);
			var p2 = db.insert(con, 'HonorsProject', 'Test', obj2);
			return Promise.all([p1, p2]).then(done());
		});

		afterEach(() => {
			return db.deleteMany(con, 'HonorsProject', 'Test', {});
		});

		describe('Insert', function() {
			it('Item should be added to the database', function(done) {
				db.insert(con, 'HonorsProject', 'Test', { new: 'obj1' }).then(
					result => {
						expect(result.insertedCount).to.equals(1);
						done();
					},
					reason => done(reason)
				);
			});

			it('Item should not be added to the database', function(done) {
				db.insert(con, 'HonorsProject', 'Test', 5).then(
					result => done(result),
					reason => done()
				);
			});
		});

		describe('Insert Many', function() {
			before(done => {
				return db
					.deleteMany(con, 'HonorsProject', 'Test', {})
					.then(done());
			});

			it('Three items should be added to the database', function(done) {
				db.insertMany(con, 'HonorsProject', 'Test', [
					{ new: 'obj1' },
					{ new: 'obj2' },
					{ new: 'obj3' }
				]).then(
					result => {
						expect(result.insertedCount).to.equals(3);
						done();
					},
					reason => done(reason)
				);
			});
		});

		describe('Delete', function() {
			before(done => {
				db.insert(con, 'HonorsProject', 'Test', {
					test: 'delete me'
				}).then(result => done(), reason => done(reason));
			});

			it('Item should be deleted', function(done) {
				db.delete(con, 'HonorsProject', 'Test', {
					test: 'delete me'
				}).then(
					result => {
						expect(result.deletedCount).to.equals(1);
						done();
					},
					reason => done(reason)
				);
			});

			it('Should fail no items to delete', function(done) {
				db.delete(con, 'HonorsProject', 'Test', {
					test: 'delete me 2'
				}).then(
					result => {
						expect(result.deletedCount).to.equals(0);
						done();
					},
					reason => done(reason)
				);
			});
		});

		describe('Delete Many', function() {
			before(done => {
				var p1 = db.insert(con, 'HonorsProject', 'Test', {
					name: 'delete2',
					test: 'delete me'
				});
				var p2 = db.insert(con, 'HonorsProject', 'Test', {
					name: 'delete1',
					test: 'delete me'
				});

				Promise.all([p1, p2]).then(done());
			});

			it('2 items should be deleted', function(done) {
				db.deleteMany(con, 'HonorsProject', 'Test', {
					test: 'delete me'
				}).then(
					result => {
						expect(result.deletedCount).to.equals(2);
						done();
					},
					reason => done(reason)
				);
			});
		});

		describe('Find', function() {
			beforeEach(done => {
				var p1 = db.insert(con, 'HonorsProject', 'Test', {
					find1: 'yes',
					find2: 'yes',
					find3: 'yes'
				});
				var p2 = db.insert(con, 'HonorsProject', 'Test', {
					find1: 'no',
					find2: 'yes',
					find3: 'yes'
				});
				var p3 = db.insert(con, 'HonorsProject', 'Test', {
					find1: 'no',
					find2: 'no',
					find3: 'yes'
				});
				var p4 = db.insert(con, 'HonorsProject', 'Test', {
					test: 'name',
					find2: 'no',
					find3: 'yes'
				});

				Promise.all([p1, p2, p3, p4]).then(() => done());
			});

			it('Should find 0 object', function(done) {
				db.find(con, 'HonorsProject', 'Test', {
					find0: 'yes'
				}).then(
					result => {
						expect(result.length).to.equals(0);
						done();
					},
					reason => done(reason)
				);
			});

			it('Should find 1 object', function(done) {
				db.find(con, 'HonorsProject', 'Test', { find1: 'yes' }).then(
					result => {
						expect(result.length).to.equals(1);
						done();
					},
					reason => done(reason)
				);
			});

			it('Should find 2 objects', function(done) {
				db.find(con, 'HonorsProject', 'Test', { find2: 'yes' }).then(
					result => {
						expect(result.length).to.equals(2);
						done();
					},
					reason => done(reason)
				);
			});

			it('Should find all objects', function(done) {
				db.find(con, 'HonorsProject', 'Test', {}).then(
					result => {
						expect(result.length).to.equals(6);
						done();
					},
					reason => done(reason)
				);
			});
		});

		after(done => {
			var p1 = db.deleteMany(con, 'HonorsProject', 'Test', {}).then(
				result => {},
				reason => {
					done(reason);
				}
			);
			var p2 = con.close();
			return Promise.all([p1, p2]).then(done());
		});
	});
});
