$(document).ready(function() {
	hide();

	$("[name='descriptionofproblemproblem']").change(function() {
		if ($(this).val() == 'other')
			$("[name='descriptionofproblemproblemother']").each(function() {
				$(this)
					.parent('div')
					.parent('div')
					.removeClass('uk-hidden');
			});
		hide();
	});

	function hide() {
		$("[name='descriptionofproblemproblemother']").each(function() {
			if ($("[name='descriptionofproblemproblem']").val() != 'other') {
				$(this)
					.parent('div')
					.parent('div')
					.addClass('uk-hidden');
				$(this).val('');
			}
		});
	}
});
