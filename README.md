node-array
==========

Extending the array object for Node.js, to provide more methods and features to operate array object.

Features
-

Asynchronize forEach() Method:
    
    var Array = require('../');
    
    var a = [ 1, 2, 3, 4, 5 ];
    
    a.forEachAsync(function(element, index, complete) {
            console.log(element);
    }, function() {
            console.log('complete');
    });

License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2012 Fred Chien <<cfsghost@gmail.com>>