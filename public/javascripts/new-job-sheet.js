$('button').click(function() {
	var jobsheet = new Object();
	jobsheet.data = {};
	$('form#jobsheetform :input').each(function() {
		var input = $(this);

		var submit = true;
		var data = new Object();
		data.type = input.attr('type');
		data.name = input.attr('name');

		if (data.type != 'radio') {
			data.value = input.val();
		}

		if (data.type == 'checkbox') data.checked = input.is(':checked');

		if (data.type == 'radio') {
			if (input.is(':checked') == true) {
				data.checked = input.is(':checked');
				data.value = input.val();
			} else {
				submit = false;
			}
		}

		if (data.type == 'date') data.value = new Date(data.value);

		if (submit) jobsheet.data[data.name] = data;
	});

	console.log($('#id'));
	console.log(jobsheet);

	$.ajax({
		type: 'POST',
		url: '/',
		dataType: 'json',
		data: { id: $('#id').text(), jobsheet },
		success: function() {
			console.log('saved');
			$('#savemessage').removeClass('uk-hidden');
			var date = new Date().toLocaleTimeString();
			$('#savemessage').text('Saved! ' + date);
		}
	});
});
