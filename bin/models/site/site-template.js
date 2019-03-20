module.exports = {
	date: { type: 'date', requiredfield: true, title: 'Date' },
	time: { type: 'time', requiredfield: true, title: 'Time' },
	address: {
		street: { type: 'string', title: 'Street' },
		city: { type: 'string', title: 'City' },
		postcode: { type: 'string', title: 'Postcode' }
	},
	notes: { type: 'textarea', title: 'Notes' }
};
