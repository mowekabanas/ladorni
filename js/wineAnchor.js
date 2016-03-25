
/* Wine Anchor */

var WineAnchor = (function() {

	function WineAnchor(viewport) {

		this.viewport = viewport;

		var isActive = !!this.viewport;

		if (isActive) {

			if (this.viewport.hasAttribute('href')) {

				this.url = this.viewport.href;
				this.hasFocus = true;

			} else {

				this.url = '#';
				this.hasFocus = false;

			}

		}

	}

	/**
	 * Add focus to anchor element
	 */
	WineAnchor.prototype.focus = function() {

		if (!this.hasFocus)
			this.enableFocus();

		this.getViewport().focus();

	};

	/**
	 * Remove focus from anchor element
	 */
	WineAnchor.prototype.blur = function() {

		this.getViewport().blur();

	};

	/**
	 * Allow to get focus to anchor element
	 */
	WineAnchor.prototype.enableFocus = function() {

		this.hasFocus = true;

		this.getViewport().href = this.url;

	};

	/**
	 * Avoid to get focus to anchor element
	 */
	WineAnchor.prototype.disableFocus = function() {

		this.hasFocus = false;

		this.getViewport().removeAttribute('href');
		this.blur();

	};

	/**
	 * Getter from focus
	 * @return {Element}
	 */
	WineAnchor.prototype.getViewport = function() {

		return this.viewport;

	};

	/**
	 * Getter from URL
	 * @return {*|string|string}
	 */
	WineAnchor.prototype.getURL = function() {

		return this.url;

	};

	/**
	 * Add 'click' listener to anchor
	 * @param listener {function}
	 */
	WineAnchor.prototype.addListener = function(listener) {

		if (this.viewport.addEventListener)
			this.viewport.addEventListener('click', listener, false);
		else
			this.viewport.attachEvent('onclick', listener);

	};

	return WineAnchor;

})();