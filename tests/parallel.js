
var Array = require('../');

var a = [];
for (var i = 0; i < 1000; i++) {
	a.push(i+1);
}

a.parallel(50, function(element, index, arr, complete) {

	setTimeout(function() {
		console.log(element);
		complete();
	}, Math.round(Math.random() * 1000));
}, function() {
	console.log('complete');
});

