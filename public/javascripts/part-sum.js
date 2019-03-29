$(document).on('change', '#partlist li', function() {
	var part = $(this).find('.uk-accordion-content');
	var sale = part.find('input[name=saleprice]');
	var cost = part.find('input[name=cost]').val();
	var postage = part.find('input[name=postage]').val();
	var fixed = part.find('input[name=fixed]').val();
	var percent = part.find('input[name=percent]').val();

	if (!cost || cost == '') cost = 0;
	if (!postage || postage == '') postage = 0;
	if (!fixed || fixed == '') fixed = 0;
	if (!percent || percent == '') percent = 0;

	var total = Number(cost) + Number(postage);
	if (percent != 0) total = Number(total) + Number(total * (percent / 100));
	if (fixed != 0) total = Number(total) + Number(fixed);
	sale.val(total);
});

$(document).on('change', 'input[name=fixed]', function() {
	var part = $(this).closest('.uk-accordion-content');
	if ($(this).val() != '' && $(this).val()) {
		var percent = part.find('input[name=percent]');
		percent.val('');
		percent.prop('disabled', true);
	} else {
		part.find('input[name=percent]').prop('disabled', false);
	}
});

$(document).on('change', 'input[name=percent]', function() {
	var part = $(this).closest('.uk-accordion-content');
	if ($(this).val() != '' && $(this).val()) {
		var fixed = part.find('input[name=fixed]');
		fixed.val('');
		fixed.prop('disabled', true);
	} else {
		part.find('input[name=fixed]').prop('disabled', false);
	}
});
