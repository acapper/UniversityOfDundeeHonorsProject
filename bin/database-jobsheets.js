var exports = (module.exports = {});

const db = require('../bin/database');
const config = require('../config');
const dbname = config.database.name;

let uri = null;
if (config.database.travis == false) {
	uri = config.database.connection;
} else {
	uri = 'mongodb://travis:test@127.0.0.1/HonorsProject';
}

exports.getAll = function(collection) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.find(con, dbname, collection, {}).then(
					result => {
						con.close();
						resolve(result);
					},
					reason => {
						con.close();
						reject(reason);
					}
				);
			},
			reason => {
				reject(reason);
			}
		);
	});
};

exports.get = function(collection, query) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.find(con, dbname, collection, query).then(
					result => {
						resolve(result);
					},
					reason => {
						reject(reason);
					}
				);
			},
			reason => {
				reject(reason);
			}
		);
	});
};

exports.delete = function(collection, query) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.delete(con, dbname, collection, query).then(
					result => {
						resolve(result);
					},
					reason => {
						reject(reason);
					}
				);
			},
			reason => {
				reject(reason);
			}
		);
	});
};

exports.update = function(collection, query, update) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.update(con, dbname, collection, query, update).then(
					result => {
						con.close();
						resolve(result);
					},
					reason => {
						con.close();
						reject(reason);
					}
				);
			},
			reason => {
				reject(reason);
			}
		);
	});
};

exports.new = function(collection, jobsheet) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.insert(con, dbname, collection, jobsheet).then(
					result => {
						con.close();
						resolve(result);
					},
					reason => {
						con.close();
						reject(reason);
					}
				);
			},
			reason => {
				reject(reason);
			}
		);
	});
};
