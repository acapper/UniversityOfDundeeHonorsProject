module.exports = {
	jobsheet: { type: Number, ref: 'jobsheet' },
	address: {
		street: { type: String, required: true },
		city: { type: String, required: true },
		postcode: { type: String, required: true }
	},
	date: { type: Date, required: true },
	time: { type: String, required: true },
	notes: String
};
