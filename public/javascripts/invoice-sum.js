$(document).on('change', '#partlist li', function(e) {
	var part = $(this).find('.uk-accordion-content');
	var cost = part.find('input[name=cost]');
	var postage = part.find('input[name=postage]');
	var fixed = part.find('input[name=fixed]');
	var percent = part.find('input[name=percent]');
	var sale = part.find('input[name=saleprice]');

	if (
		e.target == cost[0] ||
		e.target == postage[0] ||
		e.target == fixed[0] ||
		e.target == percent[0] ||
		e.target == sale[0]
	) {
		updateInvoiceAmount();
	}
});

$(document).on('change', '#sitelist li', function(e) {
	var site = $(this).find('.uk-accordion-content');
	var duration = site.find('input[name=duration]');
	var rate = site.find('input[name=rate]');
	var additional = site.find('input[name=additional]');
	var labour = site.find('input[name=labour]');

	if (
		e.target == duration[0] ||
		e.target == rate[0] ||
		e.target == additional[0] ||
		e.target == labour[0]
	) {
		updateInvoiceAmount();
	}
});

var updateInvoiceAmount = () => {
	const sites = $('#sitelist li input[name=labour]');
	const parts = $('#partlist li input[name=saleprice]');

	var total = 0;
	sites.each((idx, el) => {
		var val = el.value;
		if (val && val != '' && val != 0) {
			total = Number(total) + Number(val);
		}
	});

	parts.each((idx, el) => {
		var val = el.value;
		if (val && val != '' && val != 0) {
			total = Number(total) + Number(val);
		}
	});

	$('input[name=amount]').val(total);
};
