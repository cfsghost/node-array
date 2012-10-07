node-array
==========

Extending the array object for Node.js, to provide more methods and features to operate array object.

Features
-

Asynchronize forEach() Method:
    
    var Array = require('node-array');
    
    var a = [ 1, 2, 3, 4, 5 ];
    
    a.forEachAsync(function(element, index, arr) {
            console.log(element);
    }, function() {
            console.log('complete');
    });

Simulate "break" statement of For-Loop:
    
    var Array = require('node-array');
    
    var a = [ 1, 2, 3, 4, 5 ];
    
    a.forEachAsync(function(element, index, arr) {
            console.log(element);
            
            if (element == 3)
                return false;

    }, function() {
            console.log('complete');
    });


Simulate "continue" statement of For-Loop:
    
    var Array = require('node-array');
    
    var a = [ 1, 2, 3, 4, 5 ];
    
    a.forEachAsync(function(element, index, arr, next) {
            console.log(element);

            // continue after one second
            setTimeout(function() {
            
                // Use next() to continue
                next();
            }, 1000);
            
            return true;
    }, function() {
            console.log('complete');
    });



Installation
-
Using NPM utility to install module directly:

    npm install node-array

License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2012 Fred Chien <<cfsghost@gmail.com>>
