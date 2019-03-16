const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const config = require('../config');
const dbname = config.database.connection;
const Schema = mongoose.Schema;

var exports = (module.exports = {});
exports.mongoose = mongoose.connect(dbname, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const jobsheet = require('./models/jobsheet/jobsheet-schema');
const jobsheetSchema = new Schema(jobsheet);
autoIncrement.initialize(mongoose.connection);
jobsheetSchema.plugin(autoIncrement.plugin, 'jobsheet');
exports.Jobsheet = mongoose.model('jobsheet', jobsheetSchema);

const site = require('./models/site/site-schema');
const siteSchema = new Schema(site);
exports.Site = mongoose.model('site', siteSchema);

const user = require('./models/user/user-schema');
const userSchema = new Schema(user);
exports.User = mongoose.model('user', userSchema);

const part = require('./models/part/part-schema');
const partSchema = new Schema(part);
exports.Part = mongoose.model('part', partSchema);
