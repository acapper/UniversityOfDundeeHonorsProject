$('.save-button').click(function() {
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

	var sitevisits = [];
	$('.visit').each(function() {
		var visit = new Object();
		visit.data = {};
		$(this)
			.find(':input')
			.each(function() {
				var input = $(this);
				var submit = true;
				var data = new Object();
				var type = input.attr('type');
				var name = input.attr('name');
				data.name = name;

				if (type != 'radio' && type != 'checkbox')
					data.value = input.val();

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

				if (submit) visit.data[name] = data;
			});
		sitevisits.push(visit);
	});
	jobsheet.data['sitevisits'] = sitevisits;

	var parts = [];
	$('.part').each(function() {
		var part = new Object();
		part.data = {};
		$(this)
			.find(':input')
			.each(function() {
				var input = $(this);
				var submit = true;
				var data = new Object();
				var type = input.attr('type');
				var name = input.attr('name');
				data.name = name;

				if (type != 'radio' && type != 'checkbox')
					data.value = input.val();

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

				if (submit) part.data[name] = data;
			});
		parts.push(part);
	});
	jobsheet.data['parts'] = parts;

	console.log(jobsheet);

	$.ajax({
		type: 'POST',
		url: '/jobsheets/new',
		dataType: 'json',
		data: { id: $('#id').text(), jobsheet },
		success: function(res) {
			if (res.id != null) {
				$(location).attr('href', '/jobsheets/view/' + res.id);
			} else {
				$('#savemessage').removeClass('uk-invisible');
				var date = new Date().toLocaleTimeString();
				$('#savemessage').text('Saved! ' + date);
			}
		}
	});
});

$('.add-part').click(function() {
	$.ajax({
		type: 'GET',
		url: '/jobsheets/part',
		success: function(res) {
			$('#partlist').append(res);
		}
	});
});

$('.add-sitevisit').click(function() {
	$.ajax({
		type: 'GET',
		url: '/jobsheets/sitevisit',
		success: function(res) {
			$('#sitelist').append(res);
		}
	});
});
