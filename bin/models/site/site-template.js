module.exports = {
	address: {
		street: { type: 'string', requiredfield: true, title: 'Street' },
		city: { type: 'string', requiredfield: true, title: 'City' },
		postcode: { type: 'string', requiredfield: true, title: 'Postcode' }
	},
	date: { type: 'date', requiredfield: true, title: 'Date' },
	time: { type: 'time', requiredfield: true, title: 'Time' },
	notes: { type: 'textarea', title: 'Notes' }
};
