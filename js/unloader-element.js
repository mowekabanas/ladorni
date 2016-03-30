
/* Content Unloader Element */

var UnloaderElement = (function () {

	/**
	 * Content Unloader Element constructor
	 * @param viewport {object}
	 * @constructor
	 */
	function UnloaderElement(viewport) {

		var self = this;

		this.viewport = viewport || false;

		this.src = '';

		if (this.viewport)
			this.init();

	}

	UnloaderElement.prototype.load = function () {

		this.viewport.src = this.src;

	};

	UnloaderElement.prototype.removeLink = function () {

		this.src = this.viewport.src;
		this.viewport.src = '';

	};

	UnloaderElement.prototype.init = function () {

		this.removeLink();

	};

	return UnloaderElement;

})();