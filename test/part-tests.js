const part = require('../bin/models/part/part');

describe('Job Sheets Tests', function() {
	describe('New', function() {
		var id = null;
		it('Should successfully create new part', function(done) {
			part.new({
				name: 'test',
				purchased: new Date(),
				cost: 10,
				store: 'amazon'
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
			part.delete(id)
				.then(res => {
					done();
				})
				.catch(err => {
					done('New after failed');
				});
		});
	});

	describe('On Order', function() {
		it('Should successfully get all parts on order', function(done) {
			part.onOrder()
				.then(res => {
					done();
				})
				.catch(err => {
					done(err);
				});
		});
	});

	describe('Find One', function() {
		var id = null;
		before(done => {
			part.new({
				name: 'test',
				purchased: new Date(),
				cost: 10,
				store: 'amazon'
			})
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done('Find One before failed');
				});
		});
		it('Should successfully find part with matching id', function(done) {
			part.findOne(id)
				.then(res => {
					if (String(res._id) == String(id)) done();
					else done("Ids don't match");
				})
				.catch(err => {
					done(err);
				});
		});
		after(done => {
			part.delete(id)
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
			part.new({
				name: 'test',
				purchased: new Date(),
				cost: 10,
				store: 'amazon'
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
			part.update(id, { name: 'updated' })
				.then(res => {
					if (res.name == 'updated') done();
					else done('Name not updated');
				})
				.catch(err => {
					done(err);
				});
		});
		after(done => {
			part.delete(id)
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
			part.new({
				name: 'test',
				purchased: new Date(),
				cost: 10,
				store: 'amazon'
			})
				.then(res => {
					id = res._id;
					done();
				})
				.catch(err => {
					done('Delete before failed');
				});
		});
		it('Should successfully delete part with matching id', function(done) {
			part.delete(id)
				.then(res => {
					done();
				})
				.catch(err => {
					done(err);
				});
		});
	});
});
