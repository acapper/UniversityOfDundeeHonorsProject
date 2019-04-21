const site = require('../bin/models/site/site');

describe('Job Sheets Tests', function() {
	describe('New', function() {
		var id = null;
		it('Should successfully create new site', function(done) {
			site.new({
				date: new Date(),
				time: new Date()
			})
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done(err);
				});
		});
		after(done => {
			site.delete(id)
				.then(res => {
					done();
				})
				.catch(err => {
					done('New after failed');
				});
		});
	});

	describe('Find One', function() {
		var id = null;
		before(done => {
			site.new({
				date: new Date(),
				time: new Date()
			})
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done('Find One before failed');
				});
		});
		it('Should successfully find site with matching id', function(done) {
			site.findOne(id)
				.then(res => {
					if (String(res._id) == String(id)) done();
					else done("Ids don't match");
				})
				.catch(err => {
					done(err);
				});
		});
		after(done => {
			site.delete(id)
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
			site.new({
				date: new Date(),
				time: new Date()
			})
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done('Update before failed');
				});
		});
		it('Should successfully update job sheet with matching id name to be updated', function(done) {
			site.update(id, { name: 'updated' })
				.then(res => {
					if (res.name == 'updated') done();
					else done('Name not updated');
				})
				.catch(err => {
					done(err);
				});
		});
		after(done => {
			site.delete(id)
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
			site.new({
				date: new Date(),
				time: new Date()
			})
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done('Delete before failed');
				});
		});
		it('Should successfully delete site with matching id', function(done) {
			site.delete(id)
				.then(res => {
					done();
				})
				.catch(err => {
					done(err);
				});
		});
	});

	describe('Upcoming', function() {
		it('Should successfully get all upcoming site visits', function(done) {
			site.upcomingVisits()
				.then(res => {
					done();
				})
				.catch(err => {
					done(err);
				});
		});
	});
});
