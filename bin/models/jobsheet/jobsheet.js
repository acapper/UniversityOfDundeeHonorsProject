const Jobsheet = require('../../db').Jobsheet;
const utils = require('../../utlis');

var exports = (module.exports = {});

exports.new = jobsheet => {
	return new Promise(function(resolve, reject) {
		if (!jobsheet) throw new Error('Jobsheet is null');
		if (!jobsheet.meta.due) throw new Error('Due date is required');
		if (!jobsheet.customer.name)
			throw new Error('Customer name is required');

		const data = new Jobsheet(jobsheet);
		data.save(function(err, res) {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.findOne = id => {
	return new Promise(function(resolve, reject) {
		Jobsheet.findById(id)
			.populate('sites')
			.populate('parts')
			.populate('users')
			.exec((err, res) => {
				if (err) reject(err);
				resolve(res);
			});
	});
};

exports.update = (id, data) => {
	return new Promise(function(resolve, reject) {
		Jobsheet.findById(id, (err, doc) => {
			if (err) reject(err);
			if (!doc) {
				reject(new Error('Document not found'));
			} else {
				doc = utils.updateJSON(doc, data);
				doc.save(function(err, res) {
					if (err) reject(err);
					resolve(res);
				});
			}
		});
	});
};

exports.delete = id => {
	return new Promise(function(resolve, reject) {
		Jobsheet.findByIdAndRemove(id).exec((err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};
