var Array = require('../');

var a = [ 1, 2, 3, 4, 5 ];

a.forEachAsync(function(element, index, arr) {

	if (index == 2)
		return false;

	console.log(element);
}, function() {
	console.log('complete');
});
