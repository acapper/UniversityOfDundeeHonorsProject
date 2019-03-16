const mongoose = require('mongoose');

var exports = (module.exports = {});

exports.checkID = id => {
	if (!id) throw new Error('ID is null');
	try {
		id = new mongoose.mongo.ObjectId(id);
	} catch (e) {
		throw e;
	}
};
