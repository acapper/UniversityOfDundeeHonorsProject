module.exports = {
	template: [
		{
			name: 'sitevisit',
			fields: [
				{ name: 'address', label: 'Address', type: 'text' },
				{ name: 'date', label: 'Date', type: 'date' },
				{ name: 'time', label: 'Start Time', type: 'time' },
				{ name: 'notes', label: 'Notes', type: 'textarea' }
			]
		}
	]
};
