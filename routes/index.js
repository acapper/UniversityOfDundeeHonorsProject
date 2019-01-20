var express = require('express');
var router = express.Router();
var config = require('../config');
var dbget = require('../bin/database-get');

var MongoClient = require('mongodb').MongoClient;
var uri = config.database.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'OCS',
		name: 'Job Sheet Name',
		layout: [
			{
				title: 'Customer Details',
				fields: [
					{ name: 'name', label: 'Name', type: 'text' },
					{ name: 'billto', label: 'Bill to', type: 'text' },
					{ name: 'telephone', label: 'Telephone', type: 'text' },
					{ name: 'mobile', label: 'Mobile', type: 'text' },
					{
						name: 'onsitevisit',
						label: 'Onsite Visit',
						type: 'checkbox'
					},
					{
						name: 'remote',
						label: 'Remote',
						type: 'checkbox'
					},
					{
						name: 'date',
						label: 'Date',
						type: 'date'
					},
					{
						name: 'time',
						label: 'Time',
						type: 'time'
					}
				]
			},
			{
				title: 'Description of problem',
				fields: [
					{
						name: 'description',
						label: 'Description',
						type: 'textarea',
						rows: '5'
					},
					{ name: 'make', label: 'Make', type: 'text' },
					{ name: 'model', label: 'Model', type: 'text' },
					{ name: 'user', label: 'User', type: 'text' },
					{ name: 'password', label: 'Password', type: 'text' },
					{
						name: 'charger',
						label: 'Charger',
						type: 'checkbox'
					},
					{
						name: 'bag',
						label: 'Bag',
						type: 'checkbox'
					}
				]
			},
			{
				title: 'Initial Investigation',
				fields: [
					{
						name: 'notes',
						label: 'Notes',
						type: 'textarea',
						rows: '5'
					}
				]
			},
			{
				title: 'Order Details',
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
					{ name: 'saleprice', label: 'Sale Price', type: 'number' },
					{
						name: 'invoicenumber',
						label: 'Invoice Number',
						type: 'number'
					},
					{
						name: 'invoiceamout',
						label: 'Invoice Amount',
						type: 'number'
					},
					{
						name: 'invoicesent',
						label: 'Invoice Sent',
						type: 'checkbox'
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
						]
					},
					{
						name: 'reconcilereference',
						label: 'Reconcile Reference',
						type: 'text'
					}
				]
			},
			{
				title: 'Cleanup/virus check',
				fields: [
					{
						name: 'runmalwarebytes',
						label: 'Run Malwarebytes',
						type: 'checkbox'
					},
					{
						name: 'runccleaner',
						label: 'Run Ccleaner',
						type: 'checkbox'
					},
					{
						name: 'runhitman',
						label: 'Run Hitman',
						type: 'checkbox'
					},
					{
						name: 'adwcleaner',
						label: 'AdwCleaner',
						type: 'checkbox'
					},
					{
						name: 'spybot',
						label: 'Spybot',
						type: 'checkbox'
					},
					{
						name: 'installteamviewer',
						label: 'Install Teamviewer',
						type: 'checkbox'
					},
					{
						name: 'installmsupdates',
						label: 'Install MS updates',
						type: 'checkbox'
					},
					{
						name: 'installcheckavast',
						label: 'Install/check Avast',
						type: 'checkbox'
					},
					{
						name: 'installclassicshell',
						label: 'Install Classic Shell',
						type: 'checkbox'
					},
					{
						name: 'recovereddatalocation',
						label: 'Recovered data location',
						type: 'text'
					}
				]
			},
			{
				title: 'New build setup',
				fields: [
					{
						name: 'googlechrome',
						label: 'Google Chrome',
						type: 'confirmcheckbox'
					},
					{
						name: 'googlebackupsync',
						label: 'Google backup & sync',
						type: 'confirmcheckbox'
					},
					{
						name: 'avastfreeantivirus',
						label: 'Avast Free antivirus',
						type: 'confirmcheckbox'
					},
					{
						name: 'ccleaner',
						label: 'Ccleaner',
						type: 'confirmcheckbox'
					},
					{
						name: 'malwarebytes',
						label: 'Malwarebytes',
						type: 'confirmcheckbox'
					},
					{
						name: 'java',
						label: 'Java',
						type: 'confirmcheckbox'
					},
					{
						name: 'adobereader',
						label: 'Adobe Reader',
						type: 'confirmcheckbox'
					},
					{
						name: 'windowsupdates',
						label: 'Windows Updates',
						type: 'confirmcheckbox'
					},
					{
						name: 'teamviewerquicksupport',
						label: 'Team Viewer Quick Support',
						type: 'confirmcheckbox'
					},
					{
						name: 'openofficelibreoffice',
						label: 'Open Office/Libre Office',
						type: 'confirmcheckbox'
					},
					{
						name: 'emailclient',
						label: 'Email Client',
						type: 'confirmcheckbox'
					},
					{
						name: 'customerdata',
						label: 'Customer Data',
						type: 'confirmcheckbox'
					},
					{
						name: 'printer',
						label: 'Printer',
						type: 'confirmcheckbox'
					},
					{
						name: 'camerasoftware',
						label: 'Camera software',
						type: 'confirmcheckbox'
					},
					{
						name: 'sagepayroll',
						label: 'Sage/Payroll',
						type: 'confirmcheckbox'
					}
				]
			}
		]
	});
});

module.exports = router;
