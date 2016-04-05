
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

	Require.prototype.addListener = function (element) {

		element.addEventListener('load', this.onLoadCtrl, false);

	};

	/**
	 * Build a ghost element with the same src and append this to document body
	 * This ensures that always will return the fallback function
	 * @param element
	 * @return {Node}
	 */
	Require.prototype.buildGhostElement = function (element) {

		element.ghostElement = document.createElement('img');
		element.ghostElement.style.display = 'none';
		element.ghostElement.src = element.src;

		element.ghostElement.isLoaded = element.isLoaded;
		element.ghostElement.originElement = element;

		document.body.appendChild(element.ghostElement);

		return element.ghostElement;

	};

	Require.prototype.normalizeElement = function (element) {

		element.isLoaded = false;

		if (element.getAttribute('src'))
			this.addListener(this.buildGhostElement(element));
		else
			this.addListener(element);

	};

	Require.prototype.init = function () {

		for (var i = this.elements.length; i--;)
			this.normalizeElement(this.elements[i]);

	};

	return Require;

})();