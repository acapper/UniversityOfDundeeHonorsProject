const utils = require('../bin/utlis');

describe('Utils Tests', function() {
	describe('Update json', function() {
		it('Result should be equal to expected', function(done) {
			const old = {
				name: 'test',
				nothing: null,
				nest: { test: 1, nest: { test: 1 } }
			};
			const updated = {
				name: 'test',
				new: null,
				nest: { test: 2, nest: { test: 3, array: [1, 2, 3] } }
			};
			const expected = {
				name: 'test',
				nothing: null,
				nest: { test: 2, nest: { test: 3, array: [1, 2, 3] } }
			};
			const result = utils.updateJSON(old, updated);

			if (JSON.stringify(expected) === JSON.stringify(result)) done();
			else done('JSON not as expected');
		});
	});
});
