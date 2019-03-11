$(document).ready(function() {
	function openList(t) {
		var first = $(this).closest('li');
		var second = $(this)
			.closest('li')
			.parent()
			.closest('li');
		if (!second.hasClass('uk-open')) {
			UIkit.accordion('.uk-accordion').toggle(second.index(), true);
		}
		if (!first.hasClass('uk-open')) {
			UIkit.accordion(t).toggle(first.index(), true);
		}
	}

	$('.save-button').click(function() {
		$(':input[required]').each(function() {
			if ($(this).val() == null || $(this).val() == '') {
				if (
					!$(this)
						.closest('li')
						.hasClass('uk-open') &&
					$(this).attr('name') == 'customerdetailsname'
				) {
					UIkit.accordion('.uk-accordion').toggle(
						$(this)
							.closest('li')
							.index(),
						true
					);
				} else if (
					$(this).attr('name') == 'item' ||
					$(this).attr('name') == 'datepurchased' ||
					$(this).attr('name') == 'costprice'
				) {
					openList('#partlist');
				} else if (
					$(this).attr('name') == 'address' ||
					$(this).attr('name') == 'date' ||
					$(this).attr('name') == 'time'
				) {
					openList('#sitelist');
				}
			}
		});
	});

	function click(node) {
		/* https://github.com/eligrey/FileSaver.js/ */
		try {
			node.dispatchEvent(new MouseEvent('click'));
		} catch (e) {
			var evt = document.createEvent('MouseEvents');
			evt.initMouseEvent(
				'click',
				true,
				true,
				window,
				0,
				0,
				0,
				80,
				20,
				false,
				false,
				false,
				false,
				0,
				null
			);
			node.dispatchEvent(evt);
		}
	}

	$('.print-button').click(function(event) {
		event.preventDefault();
		const id = $('#id').text();
		const title = $('#title').text();
		$.ajax({
			type: 'GET',
			url: '/jobsheets/label',
			data: { id: id },
			success: function(res) {
				document.body.appendChild($(res)[0]);
				var label = document.getElementById('label');
				label.classList.remove('uk-hidden');
				domtoimage.toPng(label).then(function(dataUrl) {
					setTimeout(function() {
						$('#label').remove();
						var link = document.createElement('a');
						link.download = title + ' label.png';
						link.href = dataUrl;
						click(link);
					}, 100);
				});
			}
		});
	});

	$(document).on('click', '.button-delete', function() {
		$(this)
			.closest('li')
			.remove();
	});

	$('#jobsheetform').submit(function() {
		event.preventDefault();
		var required = false;
		$(':input[required]').each(function() {
			if ($(this).val() == null || $(this).val() == '') {
				required = true;
			}
		});
		if (!required) {
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
						if (!$(this).is(':button')) {
							var obj = inputProcess($(this));
							if (obj.submit) visit.data[obj.name] = obj.data;
						}
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
						if (!$(this).is(':button')) {
							var obj = inputProcess($(this));
							if (obj.submit) part.data[obj.name] = obj.data;
						}
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
		}
	});

	function inputProcess(input) {
		var submit = true;
		var data = new Object();
		var type = input.attr('type');
		var name = input.attr('name');
		data.name = name;

		if (type != 'radio' && type != 'checkbox') data.value = input.val();

		if (name == 'staffassign') data.value = input.val();

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
