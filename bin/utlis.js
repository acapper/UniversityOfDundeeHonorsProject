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

exports.updateJSON = (oldJSON, newJSON) => {
	Object.keys(newJSON).forEach(item => {
		/*if (Object.keys(newJSON).includes(item)) oldJSON[item] = newJSON[item];
		else*/
		try {
			if (newJSON[item].constructor === {}.constructor)
				oldJSON[item] = exports.updateJSON(
					oldJSON[item],
					newJSON[item]
				);
			else oldJSON[item] = newJSON[item];
		} catch (e) {}
	});
	return oldJSON;
};
