const expect = require('chai').expect;
const assert = require('chai').assert;

const jobsheet = require('../bin/database-jobsheets');

const db = require('../bin/database');
const config = require('../config');

let uri = null;
const dbname = config.database.name;
const dbcollection = 'Test';

if (config.database.travis == false) {
	uri = config.database.connection;
} else {
	uri = 'mongodb://travis:test@127.0.0.1/HonorsProject';
}

describe('Database Jobsheet Tests', function() {
	let con = null;
	let objs = [
		{
			id: 1,
			customer: 'Antony',
			search: 'Some text to search'
		},
		{
			id: 2,
			customer: 'Antony',
			search: 'Some text to search'
		},
		{
			id: 3,
			customer: 'Fiona',
			search: 'I say different stuff but still has text'
		},
		{
			id: 4,
			customer: 'Jeff',
			search: 'I like dogs'
		},
		{
			id: 4,
			customer: 'Jeff',
			search: 'Some text to search'
		}
	];

	before(done => {
		db.connect(uri).then(
			result => {
				con = result;
				db.insertMany(con, dbname, dbcollection, objs).then(done());
			},
			reason => done(reason)
		);
	});

	after(done => {
		db.deleteMany(con, dbname, dbcollection, {}).then(done());
		con.close();
	});

	describe('Get', function() {
		it('Should return one object', done => {
			jobsheet.get(dbcollection, { id: 2 }).then(
				result => {
					expect(result.length).to.equal(1);
					done();
				},
				reason => {
					done(reason);
				}
			);
		});

		it('Database connection should fail', done => {
			jobsheet.get(dbcollection, { customer: 'James' }).then(
				result => {
					expect(result.length).to.equal(0);
					done();
				},
				reason => {
					done(reason);
				}
			);
		});
	});

	describe('Get All', function() {
		it('Database should get all objects', done => {
			jobsheet.getAll(dbcollection).then(
				result => {
					expect(result.length).to.equal(objs.length);
					done();
				},
				reason => {
					done(reason);
				}
			);
		});
	});

	describe('Update', function() {
		it('Update 1 records', done => {
			jobsheet
				.update(
					dbcollection,
					{
						id: 4
					},
					{ $set: { customer: 'Erik' } }
				)
				.then(
					result => {
						expect(result.modifiedCount).to.equal(1);
						done();
					},
					reason => {
						done(reason);
					}
				);
		});

		it('Should update only 1 records', done => {
			jobsheet
				.update(
					dbcollection,
					{
						customer: 'Antony'
					},
					{ $set: { customer: 'Changed' } }
				)
				.then(
					result => {
						expect(result.modifiedCount).to.equal(1);
						done();
					},
					reason => {
						done(reason);
					}
				);
		});

		it('Should update only 0 records', done => {
			jobsheet
				.update(
					dbcollection,
					{
						customer: 'I am not real'
					},
					{ $set: { customer: 'Changed' } }
				)
				.then(
					result => {
						expect(result.modifiedCount).to.equal(0);
						done();
					},
					reason => {
						done(reason);
					}
				);
		});
	});

	describe('New', function() {
		it('Should make new record', done => {
			jobsheet
				.new(dbcollection, {
					customer: 'I am a new customer'
				})
				.then(
					result => {
						expect(result.insertedCount).to.equal(1);
						done();
					},
					reason => {
						done(reason);
					}
				);
		});
	});

	describe('Delete', function() {
		it('Should delete 1 record', done => {
			jobsheet
				.delete(dbcollection, {
					id: 1
				})
				.then(
					result => {
						expect(result.deletedCount).to.equal(1);
						done();
					},
					reason => {
						done(reason);
					}
				);
		});

		it('Should delete 0 records', done => {
			jobsheet
				.delete(dbcollection, {
					id: -1
				})
				.then(
					result => {
						expect(result.deletedCount).to.equal(0);
						done();
					},
					reason => {
						done(reason);
					}
				);
		});
	});

	describe('Search', function() {
		it('Should find 0 records (elphant)', done => {
			var q = {
				$text: {
					$search: 'elephant',
					$diacriticSensitive: true
				}
			};

			jobsheet.get(dbcollection, q).then(
				result => {
					expect(result.length).to.equal(0);
					done();
				},
				reason => {
					done(reason);
				}
			);
		});

		it('Should find 1 records stemmed word (dog)', done => {
			var q = {
				$text: {
					$search: 'dog',
					$diacriticSensitive: true
				}
			};

			jobsheet.get(dbcollection, q).then(
				result => {
					expect(result.length).to.equal(1);
					done();
				},
				reason => {
					done(reason);
				}
			);
		});

		it('Should find 2 records using a phrase search ("Some text")', done => {
			var q = {
				$text: {
					$search: '"Some text"',
					$diacriticSensitive: true
				}
			};

			jobsheet.get(dbcollection, q).then(
				result => {
					expect(result.length).to.equal(2);
					done();
				},
				reason => {
					done(reason);
				}
			);
		});

		it('Should find 3 records (text)', done => {
			var q = {
				$text: {
					$search: 'text',
					$diacriticSensitive: true
				}
			};

			jobsheet.get(dbcollection, q).then(
				result => {
					expect(result.length).to.equal(3);
					done();
				},
				reason => {
					done(reason);
				}
			);
		});

		it('Should find 4 records using multi word (stuff dogs search)', done => {
			var q = {
				$text: {
					$search: 'stuff dogs search',
					$diacriticSensitive: true
				}
			};

			jobsheet.get(dbcollection, q).then(
				result => {
					expect(result.length).to.equal(4);
					done();
				},
				reason => {
					done(reason);
				}
			);
		});
	});
});
