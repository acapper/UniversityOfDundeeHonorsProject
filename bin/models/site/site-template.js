module.exports = {
	date: { type: 'date', requiredfield: true, title: 'Date' },
	time: { type: 'time', requiredfield: true, title: 'Time' },
	address: {
		street: { type: 'string', title: 'Street' },
		city: { type: 'string', title: 'City' },
		postcode: { type: 'string', title: 'Postcode' }
	},
	duration: { type: 'number', title: 'Duration (hours)' },
	rate: { type: 'number', title: 'Rate (per hour)' },
	additional: { type: 'number', title: 'Additional Cost' },
	labour: { type: 'number', title: 'Labour Cost' },
	notes: { type: 'textarea', title: 'Notes' }
};
