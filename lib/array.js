
var nextTick = null;

if (process) {
	if ('nextTick' in process) {
		nextTick = process.nextTick;
		if (typeof module !== 'undefined') {
			if ('exports' in module)
				module.exports = Array;
		}
	}
}

if (!nextTick) {
	// For support general browser, using setTimeout instead of process.nextTick
	nextTick = function(func) {
		setTimeout(func, 0);
	};
}

var forEachAsync = function(callback, complete) {
	var self = this;

	function next(index, length) {
		var self = this;

		if (index >= length) {
			if (complete)
				complete.apply(this, [ true ]);

			return;
		}

		function _next(stop) {
			if (stop === false) {

				if (complete)
					complete.apply(this, [ false ]);
				
				return;
			}

			nextTick(function() {
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

if (!Array.prototype.forEachAsync)
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
			nextTick(function() {
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
				nextTick(function() {
					currentIndex++;
					_parallel(currentIndex);
				});
			}

			// Customized callback function
			callback(self[index], index, self, _complete);
		} else {
			nextTick(function() {
				_parallel(index);
			});
		}
	}

	_parallel(currentIndex);
}

if (!Array.prototype.parallel)
	Object.defineProperty(Array.prototype, 'parallel', { value: parallel });
