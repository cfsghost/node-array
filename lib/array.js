
var _Array = module.exports = Array;

_Array.prototype.forEachAsync = function(callback, complete) {
	var self = this;

	function next(index, length) {
		var self = this;

		if (index >= length) {
			if (complete)
				complete.apply(this, [ true ]);

			return;
		}

		var ret = callback.apply(self, [ self[index], index, self ]);

		process.nextTick(function() {
			if (ret === false) {

				if (complete)
					complete.apply(this, [ false ]);

				return;
			}

			next.apply(self, [ index + 1, length ]);
		});
	}

	next.apply(self, [ 0, self.length ]);
};
