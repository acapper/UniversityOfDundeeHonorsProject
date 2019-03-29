$(document).ready(function() {
	var otherselect = function(changed) {
		var val = $('.other-select')
			.find('select')
			.val();
		if (val != 'Other')
			$('.other-select')
				.find('input')
				.remove();
		else if (changed)
			$('.other-select').append(
				'<input type="text" name="store" required="required" class="uk-input">'
			);
	};
	otherselect(false);

	$(document).on('change', '.other-select select', function() {
		otherselect(true);
	});
});
