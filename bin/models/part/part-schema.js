module.exports = {
	status: { type: String, default: 'Ordered' },
	name: { type: String, required: true },
	purchased: { type: Date, required: true },
	store: String,
	cost: { type: Number, required: true },
	postage: Number,
	markup: { fixed: Number, percent: Number },
	saleprice: Number
};
