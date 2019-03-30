$(document).on('change', '#sitelist li', function() {
	var site = $(this).find('.uk-accordion-content');
	var duration = site.find('input[name=duration]').val();
	var rate = site.find('input[name=rate]').val();
	var additional = site.find('input[name=additional]').val();
	var labour = site.find('input[name=labour]');

	if (rate == '' && duration != '');
	else if (rate != '' && duration == '');

	if (!additional || additional == '') additional = 0;

	var total = Number(rate) * Number(duration);
	if (additional != 0) total = Number(total) + Number(additional);
	labour.val(total);
});

$(document).on('change', 'input[name=duration]', function() {
	var site = $(this).find('.uk-accordion-content');
	var rate = site.find('input[name=rate]');
	if (rate.val() == '' && $(this).val() != '') rate.prop('required', true);
	else rate.prop('required', false);
});

$(document).on('change', 'input[name=rate]', function() {
	var site = $(this).find('.uk-accordion-content');
	var duration = site.find('input[name=duration]');
	if (duration.val() == '' && $(this).val() != '')
		duration.prop('required', true);
	else duration.prop('required', false);
});
