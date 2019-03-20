$(document).ready(function() {
	$(document).on('click', '.button-status', function() {
		var button = $(this);
		var id = $(this).attr('data-id');
		$.ajax({
			type: 'POST',
			url: '/jobsheet/part/update/' + id,
			dataType: 'json',
			data: { data: { status: 'Arrived' } },
			success: function(res) {
				button.closest('.part').remove();
				if ($('.part').length == 0) $('.none').removeClass('uk-hidden');
			}
		});
	});
});
