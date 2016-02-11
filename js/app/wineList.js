var WineList = (function() {

	/**
	 * Constructor of the winelist
	 * @param viewport {object}
	 * @param options {object|boolean}
	 * @param init {boolean}
	 * @constructor
	 */
	function WineList(viewport, options, init) {

		this.viewport = viewport;

		this.options = {} || options;
		this.options.wineClass = '.Wine';

		this.wines = [];

		if (init)
			this.init();

	}

	/**
	 * Init the winelist
	 * Get all the wines element and get the model of this
	 */
	WineList.prototype.init = function() {

		var wines = this.viewport.querySelectorAll(this.options.wineClass);

		for (var i = wines.length; i--; )
			this.wines.push(new Wine(wines[i], false, true));

	};

	return WineList;

})();