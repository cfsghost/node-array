var Array = require('../');

var a = [ 1, 2, 3, 4, 5 ];

a.forEachAsync(function(element, index, arr) {
	console.log(element);
	console.log(index);
	console.log(arr);
}, function() {
	console.log('complete');
});
