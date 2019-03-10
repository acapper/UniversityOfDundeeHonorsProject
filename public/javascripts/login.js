$(document).ready(function() {
	$('#login').submit(function() {
		var data = {};
		var inputs = $(':input');
		inputs.each(function(item, index) {
			if (index.name != 'submit') {
				data[index.name] = index.value;
			}
		});
	});
});
