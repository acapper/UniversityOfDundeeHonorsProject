$(document).ready(function() {
	var dateoptions = {
		autoUpdateInput: false,
		buttonClasses: 'uk-button',
		applyButtonClasses: 'uk-button-primary',
		locale: {
			cancelLabel: 'Clear'
		}
	};

	$('#searchduedaterange').daterangepicker(dateoptions);
	$('#searchduedaterange').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(
			picker.startDate.format('MM/DD/YYYY') +
				' - ' +
				picker.endDate.format('MM/DD/YYYY')
		);
	});
	$('#searchduedaterange').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
	});

	$('#searchcreateddaterange').daterangepicker(dateoptions);
	$('#searchcreateddaterange').on('apply.daterangepicker', function(
		ev,
		picker
	) {
		$(this).val(
			picker.startDate.format('MM/DD/YYYY') +
				' - ' +
				picker.endDate.format('MM/DD/YYYY')
		);
	});
	$('#searchcreateddaterange').on('cancel.daterangepicker', function(
		ev,
		picker
	) {
		$(this).val('');
	});
});
