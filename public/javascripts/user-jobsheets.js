$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url: '/jobsheet/all/search',
		data: {
			user: $('#searchusers option:selected')
				.attr('data-id')
				.replace(/['"]+/g, '')
		},
		success: function(res) {
			$('#table-body').replaceWith(res);
		}
	});
});
