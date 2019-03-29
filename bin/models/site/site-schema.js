module.exports = {
	jobsheet: { type: Number, ref: 'jobsheet' },
	duration: { type: Number },
	address: {
		street: { type: String },
		city: { type: String },
		postcode: { type: String }
	},
	date: { type: Date, required: true },
	time: { type: String, required: true },
	notes: String
};
