const expect = require('chai').expect;
const assert = require('chai').assert;

const MongoClient = require('mongodb').MongoClient;

const config = require('../config');
let uri = null;
if (!config.database.travis || config.database.travis != null) {
	uri = config.database.connection;
} else {
	uri = 'mongodb+srv://travis:test@127.0.0.1';
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
});
