var exports = (module.exports = {});

exports.queryDatabase = function(client, dbname, collection, query) {
	return new Promise(function(resolve, reject) {
		var dbo = client.db(dbname);
		dbo.collection(collection)
			.find(query)
			.toArray(function(err, result) {
				if (err) throw reject(err);
				resolve(result);
			});
	});
};
