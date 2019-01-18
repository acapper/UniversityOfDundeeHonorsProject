const assert = require('chai').assert;

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://travis:tsest@127.0.0.1';

describe('Travis MongoDB', function() {
	it('Database connection should produce no errors', function() {
		MongoClient.connect(
			uri,
			{ useNewUrlParser: true },

			function(err, client) {
				assert.isNull(err, 'Database connection success');
			}
		);
	});
});
