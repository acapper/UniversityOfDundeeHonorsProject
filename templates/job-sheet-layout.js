module.exports = {
	template: [
		{
			title: 'Customer Details',
			name: 'customerdetails',
			fields: [
				{ name: 'name', label: 'Name', type: 'text', required: true },
				{
					name: 'billto',
					label: 'Bill to',
					type: 'text',
					required: false
				},
				{
					name: 'telephone',
					label: 'Telephone',
					type: 'text',
					required: false
				},
				{
					name: 'mobile',
					label: 'Mobile',
					type: 'text',
					required: false
				},
				{
					name: 'onsitevisit',
					label: 'Onsite Visit',
					type: 'checkbox',
					required: false
				},
				{
					name: 'remote',
					label: 'Remote',
					type: 'checkbox',
					required: false
				},
				{
					name: 'date',
					label: 'Date',
					type: 'date',
					required: false
				},
				{
					name: 'time',
					label: 'Time',
					type: 'time',
					required: false
				}
			]
		},
		{
			title: 'Description of problem',
			name: 'descriptionofproblem',
			fields: [
				{
					name: 'description',
					label: 'Description',
					type: 'textarea',
					rows: '5',
					required: false
				},
				{ name: 'make', label: 'Make', type: 'text', required: false },
				{
					name: 'model',
					label: 'Model',
					type: 'text',
					required: false
				},
				{ name: 'user', label: 'User', type: 'text', required: false },
				{
					name: 'password',
					label: 'Password',
					type: 'text',
					required: false
				},
				{
					name: 'charger',
					label: 'Charger',
					type: 'checkbox',
					required: false
				},
				{
					name: 'bag',
					label: 'Bag',
					type: 'checkbox',
					required: false
				}
			]
		},
		{
			title: 'Initial Investigation',
			name: 'initialinvestigation',
			fields: [
				{
					name: 'notes',
					label: 'Notes',
					type: 'textarea',
					rows: '5',
					required: false
				}
			]
		},
		{
			title: 'Site Visits',
			name: 'sitevisit',
			fields: [
				{
					name: 'sitevisit',
					label: 'Add Site Visit',
					type: 'sitevisit',
					required: false
				}
			]
		},
		{
			title: 'Parts',
			name: 'parts',
			fields: [
				{
					name: 'partadd',
					label: 'Add Part',
					type: 'partadd',
					required: false
				}
			]
		},
		{
			title: 'Order Details',
			name: 'orderdetails',
			fields: [
				{
					name: 'invoicenumber',
					label: 'Invoice Number',
					type: 'number',
					required: false
				},
				{
					name: 'invoiceamout',
					label: 'Invoice Amount',
					type: 'number',
					required: false
				},
				{
					name: 'invoicesent',
					label: 'Invoice Sent',
					type: 'checkbox',
					required: false
				},
				{
					name: 'payment',
					label: 'Payment',
					type: 'radio',
					options: [
						{ value: 'cash', label: 'Cash' },
						{ value: 'chq', label: 'CHQ' },
						{ value: 'pos', label: 'POS' },
						{ value: 'bacs', label: 'BACS' }
					],
					required: false
				},
				{
					name: 'reconcilereference',
					label: 'Reconcile Reference',
					type: 'text',
					required: false
				}
			]
		},
		{
			title: 'Cleanup/virus check',
			name: 'cleanupviruscheck',
			fields: [
				{
					name: 'runmalwarebytes',
					label: 'Run Malwarebytes',
					type: 'checkbox',
					required: false
				},
				{
					name: 'runccleaner',
					label: 'Run Ccleaner',
					type: 'checkbox',
					required: false
				},
				{
					name: 'runhitman',
					label: 'Run Hitman',
					type: 'checkbox',
					required: false
				},
				{
					name: 'adwcleaner',
					label: 'AdwCleaner',
					type: 'checkbox',
					required: false
				},
				{
					name: 'spybot',
					label: 'Spybot',
					type: 'checkbox',
					required: false
				},
				{
					name: 'installteamviewer',
					label: 'Install Teamviewer',
					type: 'checkbox',
					required: false
				},
				{
					name: 'installmsupdates',
					label: 'Install MS updates',
					type: 'checkbox',
					required: false
				},
				{
					name: 'installcheckavast',
					label: 'Install/check Avast',
					type: 'checkbox',
					required: false
				},
				{
					name: 'installclassicshell',
					label: 'Install Classic Shell',
					type: 'checkbox',
					required: false
				},
				{
					name: 'recovereddatalocation',
					label: 'Recovered data location',
					type: 'text',
					required: false
				}
			]
		},
		{
			title: 'New build setup',
			name: 'newbuildsetup',
			fields: [
				{
					name: 'googlechrome',
					label: 'Google Chrome',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'googlebackupsync',
					label: 'Google backup & sync',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'avastfreeantivirus',
					label: 'Avast Free antivirus',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'ccleaner',
					label: 'Ccleaner',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'malwarebytes',
					label: 'Malwarebytes',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'java',
					label: 'Java',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'adobereader',
					label: 'Adobe Reader',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'windowsupdates',
					label: 'Windows Updates',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'teamviewerquicksupport',
					label: 'Team Viewer Quick Support',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'openofficelibreoffice',
					label: 'Open Office/Libre Office',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'emailclient',
					label: 'Email Client',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'customerdata',
					label: 'Customer Data',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'printer',
					label: 'Printer',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'camerasoftware',
					label: 'Camera software',
					type: 'confirmcheckbox',
					required: false
				},
				{
					name: 'sagepayroll',
					label: 'Sage/Payroll',
					type: 'confirmcheckbox',
					required: false
				}
			]
		}
	]
};
