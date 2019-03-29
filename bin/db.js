const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const config = require('../config');
var dbname = '';
if (config.database.travis == false && config.database.travis != null) {
	dbname = config.database.connection;
} else {
	dbname = 'mongodb://travis:test@127.0.0.1/HonorsProject';
}
const Schema = mongoose.Schema;

var exports = (module.exports = {});
exports.mongoose = mongoose.connect(dbname, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const site = require('./models/site/site-schema');
const siteSchema = new Schema(site);
exports.Site = mongoose.model('site', siteSchema);

const user = require('./models/user/user-schema');
const userSchema = new Schema(user);
exports.User = mongoose.model('user', userSchema);

const part = require('./models/part/part-schema');
const partSchema = new Schema(part);
exports.Part = mongoose.model('part', partSchema);

const jobsheet = require('./models/jobsheet/jobsheet-schema');
const jobsheetSchema = new Schema(jobsheet);
autoIncrement.initialize(mongoose.connection);
jobsheetSchema.plugin(autoIncrement.plugin, 'jobsheet');
jobsheetSchema.pre('remove', function(next, res) {
	res.sites.forEach(element => {
		this.model('site')
			.deleteOne({
				_id: mongoose.Types.ObjectId(element._id)
			})
			.then(doc => {})
			.catch(err => console.log(err));
	});
	res.parts.forEach(element => {
		this.model('part')
			.deleteOne({
				_id: mongoose.Types.ObjectId(element._id)
			})
			.then(doc => {})
			.catch(err => console.log(err));
	});
	next();
});
exports.Jobsheet = mongoose.model('jobsheet', jobsheetSchema);
