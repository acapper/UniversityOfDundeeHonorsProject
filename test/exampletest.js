const assert = require('chai').assert;
const testfile = require('../exampletestfile');

describe('Test File', function() {
	it('sayHello should return hello', function() {
		assert.equal(testfile(), 'hello');
	});

	it('sayHello should return type string', function() {
		let result = testfile();
		assert.typeOf(result, 'string');
	});

	describe('Test File 2', function() {
		it('sayHello should return hello', function() {
			assert.equal(testfile(), 'hello');
		});

		it('sayHello should return type string', function() {
			let result = testfile();
			assert.typeOf(result, 'string');
		});
	});
});
