
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

			if (self.page.hero.viewport) {

				self.page.hero.viewport.classList.add('is-active');

				if (self.page.hero.viewport.dataset.documentState)
					if (self.page.document.viewport)
						self.page.document.viewport.classList.add(self.page.hero.viewport.dataset.documentState);

			}

		};

		this.onOverlayMouseOut = function (ev) {

			if (self.page.hero.viewport) {

				self.page.hero.viewport.classList.remove('is-active');

				if (self.page.hero.viewport.dataset.documentState)
					if (self.page.document.viewport)
						self.page.document.viewport.classList.remove(self.page.hero.viewport.dataset.documentState);

			}

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