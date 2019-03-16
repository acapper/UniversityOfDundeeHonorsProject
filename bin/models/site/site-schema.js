module.exports = {
	address: {
		street: { type: String, required: true },
		city: { type: String, required: true },
		postcode: { type: String, required: true }
	},
	date: { type: Date, required: true },
	time: { type: Date, required: true },
	notes: String
};
