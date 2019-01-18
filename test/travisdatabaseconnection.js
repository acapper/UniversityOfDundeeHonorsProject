const expect = require('chai').expect;
const assert = require('chai').assert;

const MongoClient = require('mongodb').MongoClient;

const config = require('../config');
let uri = null;
if (config.database.travis == false && config.database.travis != null) {
	uri = config.database.connection;
} else {
	uri = 'mongodb://travis:test@127.0.0.1/mydb_test';
}

describe('Travis MongoDB', function() {
	it('Database connection should produce no errors', function(done) {
		let connectingDb = new Promise(function(resolve, reject) {
			MongoClient.connect(
				uri,
				{ useNewUrlParser: true },
				function(err, db) {
					if (err) {
						reject(err);
					} else {
						resolve(db);
					}
				}
			);
		});
		connectingDb.then(
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
		let connectingDb = new Promise(function(resolve, reject) {
			MongoClient.connect(
				'uri',
				{ useNewUrlParser: true },
				function(err, db) {
					if (err) {
						reject(err);
					} else {
						resolve(db);
					}
				}
			);
		});
		connectingDb.then(
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

	it('Fail test', function() {
		assert.fail();
	});
});
