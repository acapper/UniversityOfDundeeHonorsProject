module.exports = {
	template: [
		{
			name: 'part',
			fields: [
				{ name: 'item', label: 'Item', type: 'text' },
				{
					name: 'date',
					label: 'Date',
					type: 'date'
				},
				{
					name: 'ebay',
					label: 'Ebay',
					type: 'checkbox'
				},
				{
					name: 'amazon',
					label: 'Amazon',
					type: 'checkbox'
				},
				{ name: 'other', label: 'Other', type: 'text' },
				{ name: 'costprice', label: 'Cost Price', type: 'number' },
				{ name: 'postage', label: 'Postage', type: 'number' },
				{ name: 'saleprice', label: 'Sale Price', type: 'number' }
			]
		}
	]
};
