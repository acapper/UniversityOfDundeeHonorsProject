var exports = (module.exports = {});

const db = require('../bin/database');
const config = require('../config');
const uri = config.database.connection;
const dbname = config.database.name;

exports.getAll = function() {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.find(con, dbname, 'JobSheets', {}).then(
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

exports.get = function(query) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.find(con, dbname, 'JobSheets', query).then(
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

exports.delete = function(query) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.delete(con, dbname, 'JobSheets', query).then(
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

exports.update = function(query, update) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.update(con, dbname, 'JobSheets', query, update).then(
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

exports.new = function(jobsheet) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.insert(con, dbname, 'JobSheets', jobsheet).then(
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
