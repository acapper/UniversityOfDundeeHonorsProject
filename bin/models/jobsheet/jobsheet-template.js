module.exports = {
	meta: {
		section: 'Meta',
		assigned: { type: 'user', title: 'Staff assigned' },
		due: { type: 'date', title: 'Due date', requiredfield: true },
		created: { type: 'datecreated', title: 'Date created' },
		modified: { type: 'timestamp', title: 'Last modified' }
	},
	customer: {
		section: 'Customer Details',
		name: { type: 'string', title: 'Name', requiredfield: true },
		address: {
			street: { type: 'string', title: 'Street' },
			city: { type: 'string', title: 'City' },
			postcode: { type: 'string', title: 'Postcode' }
		},
		phone: {
			telephone: { type: 'string', title: 'Telephone' },
			mobile: { type: 'string', title: 'Mobile' }
		}
	},
	problem: {
		section: 'Problem Description',
		description: { type: 'textarea', title: 'Description' },
		problemtype: { type: 'string', title: 'Problem Type' },
		equipment: {
			type: 'equipment',
			title: 'Equipment Type',
			options: [
				'',
				'Apple Device',
				'Laptop',
				'Desktop',
				'Tablet',
				'Other'
			]
		},
		make: { type: 'string', title: 'Make' },
		model: { type: 'string', title: 'Model' },
		login: { type: 'string', title: 'Login Name' },
		password: { type: 'string', title: 'Login Password' },
		charger: { type: 'boolean', title: 'Charger?' },
		bag: { type: 'boolean', title: 'Bag?' }
	},
	investigation: {
		section: 'Initial Investigation',
		notes: { type: 'textarea', title: 'Notes' }
	},
	sites: {
		section: 'Site Visits',
		type: 'site'
	},
	parts: {
		section: 'Parts List',
		type: 'part'
	},
	invoice: {
		section: 'Order Details',
		number: { type: 'number', title: 'Invoice Number' },
		amount: { type: 'number', title: 'Amount' },
		markup: {
			fixed: { type: 'number', title: 'Fixed Markup' },
			percent: { type: 'number', title: 'Percent Markup' }
		},
		sent: { type: 'boolean', title: 'Sent?' },
		payment: { type: 'string', title: 'Payment Type' },
		reference: { type: 'string', title: 'Reference Number' }
	},
	maintenance: {
		section: 'Cleanup/virus check',
		malwarebytes: { type: 'boolean', title: 'Run Malwarebytes' },
		ccleaner: { type: 'boolean', title: 'Run Ccleaner' },
		hitman: { type: 'boolean', title: 'Run Hitman' },
		adwcleaner: { type: 'boolean', title: 'AdwCleaner' },
		spybot: { type: 'boolean', title: 'Spybot' },
		msupdates: { type: 'boolean', title: 'Check MS Updates' },
		datalocation: { type: 'string', title: 'Check Antivirus' }
	},
	setup: {
		section: 'New build setup',
		googlechrome: { type: 'confirm', title: 'Google Chrome' },
		googlebackupsync: { type: 'confirm', title: 'Google backup & sync' },
		checkavast: { type: 'confirm', title: 'Install/check Avast' },
		ccleaner: { type: 'confirm', title: 'Ccleaner' },
		malwarebytes: { type: 'confirm', title: 'Malwarebytes' },
		java: { type: 'confirm', title: 'Java' },
		adobereader: { type: 'confirm', title: 'Adobe Reader' },
		windowsupdates: { type: 'confirm', title: 'Windows Updates' },
		classicshell: { type: 'confirm', title: 'Install Classic Shell' },
		teamviewer: { type: 'confirm', title: 'Install Teamviewer' },
		teamviewerquicksupport: {
			type: 'confirm',
			title: 'Team Viewer Quick Support'
		},
		freeoffice: { type: 'confirm', title: 'Open Office/Libre Office' },
		emailclient: { type: 'confirm', title: 'Email Client' },
		customerdata: { type: 'confirm', title: 'Customer Data' },
		printer: { type: 'confirm', title: 'Printer' },
		sagepayroll: { type: 'confirm', title: 'Sage/Payroll' }
	},
	notes: {
		section: 'Notes',
		type: 'textarea',
		title: 'Notes'
	}
};
