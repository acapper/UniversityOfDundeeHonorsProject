$(document).ready(function() {
	$('#search').click(function() {
		$.ajax({
			type: 'GET',
			url: '/jobsheets/search',
			data: { search: $('#searchinput').val() },
			success: function(res) {
				$('#table-body').replaceWith(res);
			}
		});
	});
});
