const MongoClient = require('mongodb').MongoClient;

var exports = (module.exports = {});

exports.connect = function(uri) {
	return new Promise(function(resolve, reject) {
		MongoClient.connect(uri, { useNewUrlParser: true }, function(err, res) {
			if (err) reject(err);
			resolve(res);
		});
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

exports.insertMany = function(connection, database, collection, array) {
	return new Promise(function(resolve, reject) {
		var dbo = connection.db(database);
		dbo.collection(collection).insertMany(array, function(err, res) {
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

exports.deleteMany = function(connection, database, collection, object) {
	return new Promise(function(resolve, reject) {
		var dbo = connection.db(database);
		dbo.collection(collection).deleteMany(object, function(err, res) {
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
			.sort({ modified: -1 })
			.toArray(function(err, res) {
				if (err) reject(err);
				resolve(res);
			});
	});
};

exports.update = function(connection, database, collection, query, object) {
	return new Promise(function(resolve, reject) {
		var dbo = connection.db(database);
		dbo.collection(collection).updateOne(query, object, function(err, res) {
			if (err) reject(err);
			resolve(res);
		});
	});
};
