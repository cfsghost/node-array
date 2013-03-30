
module.exports = Array;

var forEachAsync = function(callback, complete) {
	var self = this;

	function next(index, length) {
		var self = this;

		if (index >= length) {
			if (complete)
				complete.apply(this, [ true ]);

			return;
		}

		function _next() {
			process.nextTick(function() {
				if (ret === false) {

					if (complete)
						complete.apply(this, [ false ]);

					return;
				}

				next.apply(self, [ index + 1, length ]);
			});
		}

		var ret = callback.apply(self, [ self[index], index, self, _next ]);

		if (ret != true)
			_next();
	}

	next.apply(self, [ 0, self.length ]);
};

Object.defineProperty(Array.prototype, 'forEachAsync', { value: forEachAsync });


var parallel = function(workerNumber, callback, complete) {
	if (!callback)
		return;

	var self = this;
	var completed = 0;
	var total = self.length;
	var workerCount = 0;
	var currentIndex = 0;

	if (total == 0) {
		if (complete)
			complete();

		return;
	}

	function _complete() {
		completed++;
		workerCount--;

		if (workerCount == 0 && completed >= total) {
			if (complete)
				complete();
		} else {
			// Next item
			process.nextTick(function() {
				currentIndex++;

				_parallel(currentIndex);
			});
		}
	}

	function _parallel(index) {

		if (index >= total)
			return;

		if (workerCount < workerNumber) {
			workerCount++;

			if (workerCount < workerNumber) {
				// New worker
				process.nextTick(function() {
					currentIndex++;
					_parallel(currentIndex);
				});
			}

			// Customized callback function
			callback(self[index], index, self, _complete);
		} else {
			process.nextTick(function() {
				_parallel(index);
			});
		}
	}

	_parallel(currentIndex);
}

Object.defineProperty(Array.prototype, 'parallel', { value: parallel });
