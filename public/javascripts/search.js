var search = function() {
	$.ajax({
		type: 'GET',
		url: '/jobsheet/all/search',
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

/*https://stackoverflow.com/questions/14042193/how-to-trigger-an-event-in-input-text-after-i-stop-typing-writing*/
var delay = (function() {
	var timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

$(document).ready(function() {
	$('#searchinput').on('keyup', function(e) {
		delay(function() {
			search();
		}, 250);
	});

	$('.search').click(function() {
		search();
	});
});
