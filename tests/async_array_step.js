var Array = require('../');

var a = [ 1, 2, 3, 4, 5 ];

a.forEachAsync(function(element, index, arr, next) {
	console.log(element);

	setTimeout(function() {
		next();
	}, 1000);

	return true;
}, function() {
	console.log('complete');
});
