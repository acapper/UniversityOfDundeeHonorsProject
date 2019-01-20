const MongoClient = require('mongodb').MongoClient;

var exports = (module.exports = {});

exports.connect = function(uri) {
	return new Promise(function(resolve, reject) {
		MongoClient.connect(
			uri,
			{ useNewUrlParser: true },
			function(err, res) {
				if (err) reject(err);
				resolve(res);
			}
		);
	});
};

exports.insert = function(connection, database, collection, object) {
	return new Promise(function(resolve, reject) {
		var dbo = connection.db(database);
		dbo.collection(collection).insertOne(object, function(err, res) {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.delete = function(connection, database, collection, object) {
	return new Promise(function(resolve, reject) {
		var dbo = connection.db(database);
		dbo.collection(collection).deleteOne(object, function(err, res) {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.find = function(connection, database, collection, object) {
	return new Promise(function(resolve, reject) {
		var dbo = connection.db(database);
		dbo.collection(collection)
			.find(object)
			.toArray(function(err, res) {
				if (err) reject(err);
				resolve(res);
			});
	});
};
