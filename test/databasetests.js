const expect = require('chai').expect;
const assert = require('chai').assert;

const db = require('../bin/database');
const config = require('../config');

let uri = null;
if (config.database.travis == false && config.database.travis != null) {
	uri = config.database.connection;
} else {
	uri = 'mongodb://travis:test@127.0.0.1/mydb_test';
}

describe('Database Tests', function() {
	describe('Connection', function() {
		it('Database connection should produce no errors', function(done) {
			db.connect(uri).then(
				result => {
					expect(result).not.to.equal(null);
					done();
					result.close();
				},
				reason => {
					done(reason);
				}
			);
		});

		it('Database connection should fail', function(done) {
			db.connect('uri').then(
				result => {
					result.close();
					done(new Error('Connection should not be established'));
				},
				reason => {
					expect(reason).not.to.equal(null);
					done();
				}
			);
		});
	});

	describe('Insert', function() {
		let con = null;

		before(async () => {
			con = await db.connect(uri);
		});

		it('Item should be added to the database', function(done) {
			db.insert(con, 'HonorsProject', 'Test', {
				test: 'This is a test object'
			}).then(
				result => {
					done();
				},
				reason => {
					done(reason);
				}
			);
		});

		after(() => {
			con.close();
		});
	});

	describe('Delete', function() {
		let con = null;

		before(async () => {
			con = await db.connect(uri);
		});

		it('Item should be deleted', function(done) {
			db.delete(con, 'HonorsProject', 'Test', {
				test: 'This is a test object'
			}).then(
				result => {
					done();
				},
				reason => {
					done(reason);
				}
			);
		});

		after(() => {
			con.close();
		});
	});

	describe('Find', function() {
		let con = null;

		before(async () => {
			con = await db.connect(uri);
			db.insert(con, 'HonorsProject', 'Test', {
				test: 'This is a test object'
			}).then(
				result => {},
				reason => {
					throw new Error(reason);
				}
			);
		});

		it('Should find one object', function(done) {
			db.find(con, 'HonorsProject', 'Test', {
				test: 'This is a test object'
			}).then(
				result => {
					assert.equal(result.length, 1, 'Should return 1 result');
					done();
				},
				reason => {
					done(reason);
				}
			);
		});

		after(() => {
			db.delete(con, 'HonorsProject', 'Test', {
				test: 'This is a test object'
			}).then(
				result => {},
				reason => {
					throw new Error(reason);
				}
			);
		});
	});
});
