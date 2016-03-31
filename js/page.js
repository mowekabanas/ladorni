
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

		this.isActive = false;

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

	/**
	 * It inits and normalize the Page
	 * By default, it set to false the 'is-active' state
	 * @param isActive {boolean}
	 */
	Page.prototype.init = function (isActive) {

		var self = this;

		this.setActive(!!isActive);

		window.addEventListener('scroll', function (ev) {

			if (self.getActive())
				console.log(ev);

		})

	};

	return Page;

})();