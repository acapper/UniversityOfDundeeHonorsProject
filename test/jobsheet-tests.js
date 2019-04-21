const jobsheet = require('../bin/models/jobsheet/jobsheet');

describe('Job Sheets Tests', function() {
	describe('All', function() {
		it('Should successfully get all job sheets', function(done) {
			jobsheet
				.all()
				.then(res => {
					done();
				})
				.catch(err => {
					done(err);
				});
		});
	});

	describe('Search', function() {
		var id = null;
		before(done => {
			jobsheet
				.new({ meta: { due: new Date() }, customer: { name: 'Test' } })
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done('Search before failed');
				});
		});
		it("Should successfully find job sheet { meta: { due: todays date }, customer: { name: 'Test' } }", function(done) {
			jobsheet
				.search({
					$text: {
						$search: 'Test',
						$diacriticSensitive: true
					}
				})
				.then(res => {
					done();
				})
				.catch(err => {
					done(err);
				});
		});
		after(done => {
			jobsheet
				.delete(id)
				.then(res => {
					done();
				})
				.catch(err => {
					done('Search after failed');
				});
		});
	});

	describe('Find One', function() {
		var id = null;
		before(done => {
			jobsheet
				.new({ meta: { due: new Date() }, customer: { name: 'Test' } })
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done('Find One before failed');
				});
		});
		it('Should successfully find job sheet with matching id', function(done) {
			jobsheet
				.findOne(id)
				.then(res => {
					if (res._id == id) done();
					else done("Ids don't match");
				})
				.catch(err => {
					done(err);
				});
		});
		after(done => {
			jobsheet
				.delete(id)
				.then(res => {
					done();
				})
				.catch(err => {
					done('Find One after failed');
				});
		});
	});

	describe('Update', function() {
		var id = null;
		before(done => {
			jobsheet
				.new({ meta: { due: new Date() }, customer: { name: 'Test' } })
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done('Update before failed');
				});
		});
		it('Should successfully update job sheet with matching id name to be updated', function(done) {
			jobsheet
				.update(id, { customer: { name: 'updated' } })
				.then(res => {
					if (res.customer.name == 'updated') done();
					else done('Name not updated');
				})
				.catch(err => {
					done(err);
				});
		});
		after(done => {
			jobsheet
				.delete(id)
				.then(res => {
					done();
				})
				.catch(err => {
					done('Update after failed');
				});
		});
	});

	describe('Delete', function() {
		var id = null;
		before(done => {
			jobsheet
				.new({ meta: { due: new Date() }, customer: { name: 'Test' } })
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done('Delete before failed');
				});
		});
		it('Should successfully delete job sheet with matching id', function(done) {
			jobsheet
				.delete(id)
				.then(res => {
					done();
				})
				.catch(err => {
					done(err);
				});
		});
	});

	describe('New', function() {
		var id = null;
		it('Should successfully create new job sheet', function(done) {
			jobsheet
				.new({ meta: { due: new Date() }, customer: { name: 'Test' } })
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done(err);
				});
		});
		after(done => {
			jobsheet
				.delete(id)
				.then(res => {
					done();
				})
				.catch(err => {
					done('New after failed');
				});
		});
	});
});
