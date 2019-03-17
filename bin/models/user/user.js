const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../../db').User;
const utils = require('../../utlis');

var exports = (module.exports = {});

exports.new = user => {
	return new Promise(function(resolve, reject) {
		if (!user) throw new Error('User is null');
		if (!user.username) throw new Error('Username required');
		if (!user.password) throw new Error('Password required');

		exports
			.hashPassword(user.password)
			.then(res => {
				const data = new User({
					username: user.username,
					password: res
				});
				data.save(function(err, res) {
					if (err) reject(err);
					resolve(res);
				});
			})
			.catch(err => {
				reject(err);
			});
	});
};

exports.findByUsername = username => {
	return new Promise(function(resolve, reject) {
		User.findOne({ username }, function(err, doc) {
			if (err) reject(err);
			resolve(doc);
		});
	});
};

exports.all = () => {
	return new Promise(function(resolve, reject) {
		User.find({}, 'username', function(err, doc) {
			if (err) reject(err);
			resolve(doc);
		});
	});
};

exports.update = (id, data) => {
	return new Promise(function(resolve, reject) {
		utils.checkID(id);
		User.findById(id, (err, doc) => {
			if (err) reject(err);
			if (!doc) {
				reject(new Error('Document not found'));
			} else {
				doc.username = data.username;
				doc.password = data.password;
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
		User.findByIdAndRemove(id).exec((err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.hashPassword = password => {
	return new Promise(function(resolve, reject) {
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if (err) reject(err);
			bcrypt.hash(password, salt, function(err, hash) {
				if (err) reject(err);
				resolve(hash);
			});
		});
	});
};

exports.authenticate = (username, password) => {
	return new Promise(function(resolve, reject) {
		if (!username) throw new Error('Username required');
		if (!password) throw new Error('Password required');
		exports
			.findByUsername(username)
			.then(doc => {
				bcrypt.compare(password, doc.password, function(err, res) {
					if (err) reject(err);
					if (res === true) resolve({ username: doc.username });
					else reject(new Error("Passwords don't match"));
				});
			})
			.catch(err => {
				reject(new Error('Username not found'));
			});
	});
};
