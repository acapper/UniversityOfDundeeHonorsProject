const Site = require('../../db').Site;
const utils = require('../../utlis');

const moment = require('moment');

var exports = (module.exports = {});

exports.new = site => {
	return new Promise(function(resolve, reject) {
		if (!site) throw new Error('Site is null');
		if (!site.date) throw new Error('Date required');
		if (!site.time) throw new Error('Time required');

		const data = new Site(site);
		data.save(function(err, res) {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.upcomingVisits = () => {
	return new Promise(function(resolve, reject) {
		const date = moment()
			.startOf('day')
			.toDate();
		Site.find({
			date: {
				$gte: date
			}
		})
			.populate('jobsheet')
			.exec((err, res) => {
				if (err) reject(err);
				resolve(res);
			});
	});
};

exports.findOne = id => {
	return new Promise(function(resolve, reject) {
		utils.checkID(id);
		Site.findById(id).exec((err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.update = (id, data) => {
	return new Promise(function(resolve, reject) {
		utils.checkID(id);
		Site.findById(id, (err, doc) => {
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
		utils.checkID(id);
		Site.findByIdAndRemove(id).exec((err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};
