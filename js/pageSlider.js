
/* Page Slider */

var PageSlider = (function () {

	/**
	 * Page Slider constructor
	 * The viewport costume to be the '.PageHeader' element
	 * @constructor
	 */
	function PageSlider(page) {

		var self = this;

		this.page = page || false;

		this.onOverlayMouseOver = function (ev) {

			if (self.page.hero.viewport)
				self.page.hero.viewport.classList.add('is-active');

		};

		this.onOverlayMouseOut = function (ev) {

			if (self.page.hero.viewport)
				self.page.hero.viewport.classList.remove('is-active');

		};

		if (this.page.viewport)
			if (this.page.header)
				this.init();

	}

	PageSlider.prototype.addOverlayListener = function () {

		if (this.page.header.viewport) {

			this.page.header.viewport.addEventListener('mouseover', this.onOverlayMouseOver, false);
			this.page.header.viewport.addEventListener('mouseout', this.onOverlayMouseOut, false);

		}

	};

	PageSlider.prototype.init = function () {

		if (this.page.hero)
			this.addOverlayListener();

	};

	return PageSlider;

})();