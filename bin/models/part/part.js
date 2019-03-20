const Part = require('../../db').Part;
const utils = require('../../utlis');

var exports = (module.exports = {});

exports.new = part => {
	return new Promise(function(resolve, reject) {
		if (!part) throw new Error('Part is null');
		if (!part.name) throw new Error('Name required');
		if (!part.purchased) throw new Error('Purchase date required');
		if (!part.cost) throw new Error('Cost required');

		const data = new Part(part);
		data.save(function(err, res) {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.onOrder = () => {
	return new Promise(function(resolve, reject) {
		Part.find({ status: 'Ordered' }, function(err, doc) {
			if (err) reject(err);
			resolve(doc);
		});
	});
};

exports.findOne = id => {
	return new Promise(function(resolve, reject) {
		utils.checkID(id);
		Part.findById(id).exec((err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.update = (id, data) => {
	return new Promise(function(resolve, reject) {
		utils.checkID(id);
		Part.findById(id, (err, doc) => {
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
		Part.findByIdAndRemove(id).exec((err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};
