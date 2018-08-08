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

		this.isActive = false;

		if (init)
			this.init();

	}

	/**
	 * Based on 'active' param, it set the 'is-active' state from the viewport
	 * @param active
	 * @return {boolean}
	 */
	WineList.prototype.setActive = function (active) {

		if (this.viewport) {

			if (this.isActive = !!active)
				this.viewport.classList.add('is-active');
			else
				this.viewport.classList.remove('is-active');

			return true;

		}

		return false;

	};

	/**
	 * Get the current active state
	 * By default, it fix the 'is-active' class state
	 * @param preserveState {boolean}
	 * @return {boolean}
	 */
	WineList.prototype.getActive = function (preserveState) {

		if (!preserveState)
			this.setActive(!!this.isActive);

		return !!this.isActive;

	};

	/**
	 * Toggle active state
	 * @return {boolean}
	 */
	WineList.prototype.toggleActive = function () {

		return this.setActive(!this.isActive);

	};

	/**
	 * Init the winelist
	 * Get all the wines element and get the model of this
	 * By default, it set to false the 'is-active' state
	 * @param isActive {boolean}
	 */
	WineList.prototype.init = function(isActive) {

		var wines = this.viewport.querySelectorAll(this.options.wineClass);

		for (var i = wines.length; i--; )
			this.wines.push(new Wine(wines[i], false, true));

		this.setActive(!!isActive);

	};

	return WineList;

})();