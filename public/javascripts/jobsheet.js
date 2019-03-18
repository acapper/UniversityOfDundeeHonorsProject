$(document).ready(function() {
	var customer = section => {
		var sub = {};
		section.find(':input').each(function() {
			if (!$(this).hasClass('uk-button')) {
				var name = $(this).attr('name');
				var val = $(this).val();
				if ($(this).attr('type') == 'checkbox')
					sub[name] = $(this).is(':checked');
				else if (val && val != '')
					if (
						name == 'street' ||
						name == 'city' ||
						name == 'postcode'
					) {
						if (!sub['address']) sub['address'] = {};
						sub['address'][name] = val;
					} else if (name == 'mobile' || name == 'telephone') {
						if (!sub['phone']) sub['phone'] = {};
						sub['phone'][name] = val;
					} else sub[name] = val;
			}
		});
		return sub;
	};

	var invoice = section => {
		var sub = {};
		section.find(':input').each(function() {
			if (!$(this).hasClass('uk-button')) {
				var name = $(this).attr('name');
				var val = $(this).val();
				if ($(this).attr('type') == 'checkbox')
					sub[name] = $(this).is(':checked');
				else if (val && val != '')
					if (name == 'fixed' || name == 'percent') {
						if (!sub['markup']) sub['markup'] = {};
						sub['markup'][name] = val;
					} else sub[name] = val;
			}
		});
		return sub;
	};

	var setup = section => {
		var sub = {};
		section.find(':input').each(function() {
			if (!$(this).hasClass('uk-button')) {
				var name = $(this).attr('name');
				var keys = name.split(' ');
				if (!sub[keys[0]]) sub[keys[0]] = {};
				sub[keys[0]][keys[1]] = $(this).is(':checked');
			}
		});
		return sub;
	};

	var notes = section => {
		var sub = null;
		section.find(':input').each(function() {
			var name = $(this).attr('name');
			if (name == 'notes') sub = $(this).val();
		});
		return sub;
	};

	var misc = section => {
		var sub = {};
		section.find(':input').each(function() {
			if (!$(this).hasClass('uk-button')) {
				var name = $(this).attr('name');
				var val = $(this).val();
				if ($(this).attr('type') == 'checkbox')
					sub[name] = $(this).is(':checked');
				else if (val && val != '') {
					if (name == 'assigned') {
						if (
							$(this)
								.find(':selected')
								.attr('data-id')
						)
							sub[name] = $(this)
								.find(':selected')
								.attr('data-id')
								.replace(/['"]+/g, '');
					} else sub[name] = val;
				}
			}
		});
		section.find('.status').each(function() {
			sub['status'] = $(this).attr('data-val');
		});
		return sub;
	};

	var parts = section => {
		var list = [];
		section.find('li').each(function() {
			list.push(misc($(this)));
		});
		return list;
	};

	var sites = section => {
		var list = [];
		section.find('li').each(function() {
			list.push(customer($(this)));
		});
		return list;
	};

	$('#jobsheetform').submit(function() {
		event.preventDefault();
		var data = {};
		$('#jobsheetform section').each(function() {
			var key = $(this).attr('data-key');
			var sub = null;
			if (key == 'customer') sub = customer($(this));
			else if (key == 'invoice') sub = invoice($(this));
			else if (key == 'setup') sub = setup($(this));
			else if (key == 'notes') sub = notes($(this));
			else if (key == 'parts') sub = parts($(this));
			else if (key == 'sites') sub = sites($(this));
			else sub = misc($(this));
			data[key] = sub;
		});
		console.log(data);

		if ($('#savebutton').val() == 'Save')
			$.ajax({
				type: 'POST',
				url: '/jobsheet/insert',
				dataType: 'json',
				data: { data },
				success: function(res) {
					$(location).attr('href', '/jobsheet/' + res.id);
				}
			});
		else {
			$.ajax({
				type: 'POST',
				url: '/jobsheet/update',
				dataType: 'json',
				data: { id: $('#id').attr('data-id'), data },
				success: function(res) {
					$(location).attr('href', '/jobsheet/' + res.id);
				}
			});
		}
	});

	$('.add-part').click(function() {
		event.preventDefault();
		console.log('Getting new part');
		$.ajax({
			type: 'GET',
			url: '/jobsheet/part/blank',
			success: function(res) {
				$('#partlist').append(res);
			}
		});
	});

	$('.add-site').click(function() {
		event.preventDefault();
		console.log('Getting new part');
		$.ajax({
			type: 'GET',
			url: '/jobsheet/site/blank',
			success: function(res) {
				$('#sitelist').append(res);
			}
		});
	});

	$(document).on('click', '.button-delete', function() {
		$(this)
			.closest('li')
			.remove();
	});

	$(document).on('click', '.button-status', function() {
		var status = $(this)
			.closest('li')
			.find('.status');
		if (status.text() == 'Status: Ordered') {
			$(this).text('Set to ordered');
			status.text('Status: Arrived');
			status.attr('data-val', 'Arrived');
			$(this).addClass('uk-button-primary');
		} else {
			$(this).text('Set to arrived');
			status.text('Status: Ordered');
			status.attr('data-val', 'Ordered');
			$(this).removeClass('uk-button-primary');
		}
	});
});
