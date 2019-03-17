const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
	meta: {
		created: { type: Date, default: Date.now },
		modified: { type: Date, default: Date.now },
		assigned: { type: Schema.Types.ObjectId, ref: 'user' },
		due: { type: Date, required: true }
	},
	customer: {
		name: { type: String, required: true },
		address: {
			street: String,
			city: String,
			postcode: String
		},
		phone: { telephone: String, mobile: String }
	},
	problem: {
		description: String,
		problemtype: String,
		equipment: String,
		make: String,
		model: String,
		login: String,
		password: String,
		charger: Boolean,
		bag: Boolean
	},
	investigation: {
		notes: String
	},
	sites: [{ type: Schema.Types.ObjectId, ref: 'site' }],
	parts: [{ type: Schema.Types.ObjectId, ref: 'part' }],
	invoice: {
		number: Number,
		amount: Number,
		markup: {
			fixed: Number,
			percent: Number
		},
		sent: Boolean,
		payment: String,
		reference: String
	},
	maintenance: {
		malwarebytes: Boolean,
		ccleaner: Boolean,
		hitman: Boolean,
		adwcleaner: Boolean,
		spybot: Boolean,
		msupdates: Boolean,
		datalocation: String
	},
	setup: {
		googlechrome: {
			required: Boolean,
			done: Boolean
		},
		googlebackupsync: {
			required: Boolean,
			done: Boolean
		},
		checkavast: {
			required: Boolean,
			done: Boolean
		},
		ccleaner: {
			required: Boolean,
			done: Boolean
		},
		malwarebytes: {
			required: Boolean,
			done: Boolean
		},
		java: {
			required: Boolean,
			done: Boolean
		},
		adobereader: {
			required: Boolean,
			done: Boolean
		},
		windowsupdates: {
			required: Boolean,
			done: Boolean
		},
		classicshell: {
			required: Boolean,
			done: Boolean
		},
		teamviewer: {
			required: Boolean,
			done: Boolean
		},
		teamviewerquicksupport: {
			required: Boolean,
			done: Boolean
		},
		freeoffice: {
			required: Boolean,
			done: Boolean
		},
		emailclient: {
			required: Boolean,
			done: Boolean
		},
		customerdata: {
			required: Boolean,
			done: Boolean
		},
		printer: {
			required: Boolean,
			done: Boolean
		},
		sagepayroll: {
			required: Boolean,
			done: Boolean
		}
	},
	notes: String
};
