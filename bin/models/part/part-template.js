module.exports = {
	status: { type: 'status', title: 'Status' },
	name: { type: 'string', requiredfield: true, title: 'Description' },
	purchased: { type: 'date', requiredfield: true, title: 'Purchased' },
	store: {
		type: 'otherselect',
		requiredfield: true,
		title: 'Bought from',
		options: ['Other', 'Amazon', 'Ebay']
	},
	link: { type: 'string', title: 'Link' },
	cost: { type: 'number', requiredfield: true, title: 'Cost' },
	postage: { type: 'number', title: 'Postage' },
	markup: {
		fixed: { type: 'number', title: 'Fixed Markup' },
		percent: { type: 'number', title: 'Percent Markup' }
	},
	saleprice: { type: 'number', title: 'Sale Price' }
};
