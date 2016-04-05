
/* Navigation Item Page element */

var Page = (function() {

	/**
	 * Navigation Item Page constructor
	 * It normalize the page viewport
	 * @param viewport {Element}
	 * @return {*|boolean}
	 * @constructor
	 */
	function Page(viewport) {

		this.viewport = viewport || false;

		this.header = {};
		this.header.background = {};
		this.header.overlay = {};

		this.content = {};

		this.hero = {};

		this.isActive = false;
		this.isLoaded = false;

		if (this.viewport)
			this.init(false);

	}

	/**
	 * Based on 'active' param, it set the 'is-active' state from the viewport
	 * @param active
	 * @return {boolean}
	 */
	Page.prototype.setActive = function (active) {

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
	Page.prototype.getActive = function (preserveState) {

		if (!preserveState)
			this.setActive(!!this.isActive);

		return !!this.isActive;

	};

	/**
	 * Toggle active state
	 * @return {boolean}
	 */
	Page.prototype.toggleActive = function () {

		return this.setActive(!this.isActive);

	};

	Page.prototype.getSlide = function () {

		if (this.hero.viewport)
			this.slider = new PageSlider(this);

	};

	Page.prototype.getHeader = function () {

		// get the 'header' element
		this.header.viewport = this.viewport.querySelector('.PageHeader');

		// try get the 'background' and 'overlay' elements
		if (this.header.viewport) {

			this.header.background.viewport = this.header.viewport.querySelector('.PageHeader-background');
			this.header.overlay.viewport = this.header.viewport.querySelector('.PageHeader-overlay');

			// get the hero slider
			this.getSlide();

		}

	};

	/**
	 * It inits and normalize the Page
	 * By default, it set to false the 'is-active' state
	 * @param isActive {boolean}
	 */
	Page.prototype.init = function (isActive) {

		this.setActive(!!isActive);

		// try get connection to Hero Slider and Header
		this.getHeader();

	};

	return Page;

})();