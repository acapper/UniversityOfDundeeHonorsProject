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

exports.getOne = function(query, collection) {
	return new Promise(function(resolve, reject) {
		db.connect(uri).then(
			con => {
				db.find(con, dbname, collection, query).then(
					result => {
						con.close();
						resolve(result[0]);
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
