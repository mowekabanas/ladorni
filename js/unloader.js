
/* Content Unloader */

var Unloader = (function () {

	/**
	 * Content Unloader constructor
	 * @param elements {Array||object}
	 * @constructor
	 */
	function Unloader(elements) {

		var self = this;

		this.elements = elements || [];

		this.isLoaded = true;

		if (this.elements.length)
			this.init();

	}

	Unloader.prototype.load = function () {

		for (var i = this.elements.length; i--;)
			this.elements[i].unloader.load();

		this.isLoaded = true;

	};

	Unloader.prototype.init = function () {

		this.isLoaded = false;

		for (var i = this.elements.length; i--;)
			this.elements[i].unloader = new UnloaderElement(this.elements[i]);

	};

	return Unloader;

})();