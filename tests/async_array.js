var Array = require('../');

var a = [ 1, 2, 3, 4, 5 ];

a.forEachAsync(function(element, index, complete) {
	console.log(element);
}, function() {
	console.log('complete');
});
