$(document).ready(function() {
	$('.save-button').click(function() {
		$(':input[required]').each(function() {
			if (
				!$(this).val() &&
				!$(this)
					.closest('li')
					.hasClass('uk-open') &&
				$(this).attr('name') != 'duedate'
			) {
				UIkit.accordion('.uk-accordion').toggle(
					$(this)
						.closest('li')
						.index(),
					true
				);
			}
		});
	});

	$(document).on('click', '.button-delete', function() {
		$(this)
			.closest('li')
			.remove();
	});

	$('#jobsheetform').submit(function(event) {
		event.preventDefault();
		var jobsheet = new Object();
		jobsheet.data = {};
		$('form#jobsheetform :input').each(function() {
			var obj = inputProcess($(this));
			if (
				$('#partlist').has($(this)).length == 0 &&
				$('#sitelist').has($(this)).length == 0
			) {
				if (
					$(this).attr('name') != 'createddate' &&
					!$(this).hasClass('save-button')
				)
					if (obj.submit) jobsheet.data[obj.name] = obj.data;
			}
		});

		var sitevisits = [];
		$('.visit').each(function() {
			var visit = new Object();
			visit.data = {};
			$(this)
				.find(':input')
				.each(function() {
					var obj = inputProcess($(this));
					if (obj.submit) visit.data[obj.name] = obj.data;
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
					var obj = inputProcess($(this));
					if (obj.submit) part.data[obj.name] = obj.data;
				});
			parts.push(part);
		});
		jobsheet.data['parts'] = parts;

		$.ajax({
			type: 'POST',
			url: '/jobsheets/new',
			dataType: 'json',
			data: { id: $('#id').text(), jobsheet },
			success: function(res) {
				if (res.id != null) {
					console.log(res.id);
					$(location).attr('href', '/jobsheets/view/' + res.id);
				} else {
					$('#savemessage').removeClass('uk-invisible');
					var date = new Date().toLocaleTimeString();
					$('#savemessage').text('Saved! ' + date);
				}
			}
		});

		console.log(jobsheet);
	});

	function inputProcess(input) {
		var submit = true;
		var data = new Object();
		var type = input.attr('type');
		var name = input.attr('name');
		data.name = name;

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

		return { submit, name, data };
	}

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
});
