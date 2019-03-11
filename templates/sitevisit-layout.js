module.exports = {
	template: [
		{
			name: 'sitevisit',
			fields: [
				{
					name: 'address',
					label: 'Address',
					type: 'text',
					required: true
				},
				{ name: 'date', label: 'Date', type: 'date', required: true },
				{
					name: 'time',
					label: 'Start Time',
					type: 'time',
					required: true
				},
				{ name: 'notes', label: 'Notes', type: 'textarea' }
			]
		}
	]
};
