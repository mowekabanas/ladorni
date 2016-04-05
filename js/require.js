
/* Require Elements */

var Require = (function () {

	/**
	 * Require Elements constructor
	 * @param elements {Array|object}
	 * @param listener {Function|object}
	 * @param range {number}
	 * @constructor
	 */
	function Require(elements, listener, range) {

		var self = this;

		this.elements = elements || [];
		this.listener = listener || false;

		this.requireRange = range || .5;
		this.loadCount = 0;

		this.isLoaded = false;

		this.onLoadCtrl = function (ev) {

			self.loadCount++;

			if (!self.isLoaded)
				if (self.loadCount >= (self.elements.length * self.requireRange)) {

					if (self.listener)
						self.listener(self);

					self.isLoaded = true;

				}

		};

		if (this.elements.length)
			this.init();

	}

	Require.prototype.init = function () {

		for (var i = this.elements.length; i--;)
			this.elements[i].addEventListener('load', this.onLoadCtrl)

	};

	return Require;

})();