var search = function() {
	$.ajax({
		type: 'GET',
		url: '/jobsheets/search',
		data: {
			search: $('#searchinput').val(),
			due: $('#searchduedaterange').val(),
			created: $('#searchcreateddaterange').val(),
			sitevisits: $('#searchhassitevisit').is(':checked'),
			parts: $('#searchhasparts').is(':checked')
		},
		success: function(res) {
			$('#table-body').replaceWith(res);
		}
	});
};

$(document).ready(function() {
	$('#searchinput').on('keyup', function(e) {
		if (e.keyCode == 13) {
			search();
		}
	});

	$('.search').click(function() {
		search();
	});
});
