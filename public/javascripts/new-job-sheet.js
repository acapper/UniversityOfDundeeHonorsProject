$('button').click(function() {
	var jobsheet = new Object();
	jobsheet.data = {};
	$('form#jobsheetform :input').each(function() {
		var input = $(this);

		var data = new Object();
		data.name = input.attr('name');
		data.value = input.val();
		data.type = input.attr('type');
		if (data.type == 'checkbox') data.checked = input.is(':checked');

		jobsheet.data[data.name] = data;
	});

	console.log(jobsheet);

	$.ajax({
		type: 'POST',
		url: '/',
		dataType: 'json',
		data: { jobsheet },
		success: function() {
			console.log('saved');
		}
	});
});
