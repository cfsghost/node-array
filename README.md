# node-array

Extending the array object for Node.js, to provide more methods and features to operate array object.

Installation
-
Using NPM utility to install module directly:

    npm install node-array

Documentation
-

node-array provided many easy-use methods for Array object.

* [forEachAsync](#forEachAsync)
* [parallel](#parallel)

***

<a name="forEachAsync" />
### [Array Object].forEachAsync()

Asynchronous version of forEach() to avoid blocking by traversing array.

__Example__
```js
var Array = require('node-array');

var a = [ 1, 2, 3, 4, 5 ];

a.forEachAsync(function(element, index, arr) {
        console.log(element);
}, function() {
        console.log('complete');
});
```

Simulate "break" statement of For-Loop:
```js
var Array = require('node-array');

var a = [ 1, 2, 3, 4, 5 ];

a.forEachAsync(function(element, index, arr) {
        console.log(element);
        
        if (element == 3)
            return false;

}, function() {
        console.log('complete');
});
```

Simulate "continue" statement of For-Loop:
```js
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
```
***

<a name="parallel" />
### [Array Object].parallel()

Process all of items of array object in parallel.

__Example__
```js
var Array = require('node-array');

var a = [];

// Prepare 1000 items for testing
for (var i = 0; i < 1000; i++) {
        a.push(i+1);
}

// Make 50 workers to process all items of array in parallel
a.parallel(50, function(element, index, arr, complete) {

        setTimeout(function() {
                console.log(element);
                complete();
        }, Math.round(Math.random() * 1000));
}, function() {
        console.log('complete');
});
```

In the Browser
-
node-array can be used in the browser:
```html
<script type="text/javascript" src="node-array.js"></script>
<script type="text/javascript">
    var a = [ 1, 2, 3, 4, 5 ];
    
    a.forEachAsync(function(element, index, arr) {
            console.log(element);
    }, function() {
            console.log('complete');
    });
</script>
```
License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2012 Fred Chien <<cfsghost@gmail.com>>
