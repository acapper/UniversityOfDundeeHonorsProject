$('button').click(function() {
	var jobsheet = new Object();
	jobsheet.data = {};
	$('form#jobsheetform :input').each(function() {
		var input = $(this);

		var submit = true;
		var data = new Object();
		var type = input.attr('type');
		var name = input.attr('name');
		//data.name = input.attr('name');

		if (type != 'radio' && type != 'checkbox') data.value = input.val();

		if (type == 'checkbox') data.checked = input.is(':checked');

		if (type == 'radio') {
			if (input.is(':checked') == true) {
				data.checked = input.is(':checked');
				data.value = input.val();
			} else {
				submit = false;
			}
		}

		if (type == 'date') data.value = new Date(data.value);

		if (submit) jobsheet.data[name] = data;
	});

	$.ajax({
		type: 'POST',
		url: '/jobsheets/new',
		dataType: 'json',
		data: { id: $('#id').text(), jobsheet },
		success: function(res) {
			if (res.id != null) {
				$(location).attr('href', '/jobsheets/view/' + res.id);
			} else {
				$('#savemessage').removeClass('uk-hidden');
				var date = new Date().toLocaleTimeString();
				$('#savemessage').text('Saved! ' + date);
			}
		}
	});
});
