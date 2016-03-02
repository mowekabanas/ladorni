
/* Wine Checkout button */

var WineCheckout = (function() {

	function WineCheckout(viewport) {

		this.viewport = viewport;

		this.anchor = {};

		this.buttonTitle = {};
		this.button = {};
		this.icon = {};

		this.normalize();

		return this;

	}

	/**
	 * Add focus to element
	 */
	WineCheckout.prototype.focus = function() {

		this.anchor.viewport.href = this.anchor.url;
		this.anchor.viewport.focus();

	};

	/**
	 * Remove focus from element
	 */
	WineCheckout.prototype.blur = function() {

		this.anchor.viewport.blur();

	};

	/**
	 * Avoid to get focus to element
	 */
	WineCheckout.prototype.removeFocus = function() {

		this.anchor.viewport.removeAttribute('href');

	};

	WineCheckout.prototype.appendAndBuildButtonTitle = function() {

		var element = document.createElement('span');
		element.className = 'WineCheckoutTitle';

		var text = document.createElement('span');
		text.className = '';
		text.innerHTML = '';

		element.appendChild(text);

		this.buttonTitle.viewport = element;
		this.anchor.viewport.appendChild(this.buttonTitle.viewport);

	};

	WineCheckout.prototype.appendAndBuildButton = function() {

		var element = document.createElement('span');
		element.className = 'WineCheckoutButton';

		this.button.viewport = element;
		this.anchor.viewport.appendChild(this.button.viewport);

	};

	WineCheckout.prototype.appendAndBuildIcon = function() {

		var element = document.createElement('span');
		element.className = 'WineCheckoutIcon';

		var icon = document.createElement('span');
		icon.className = '';

		element.appendChild(icon);

		this.icon.viewport = element;
		this.anchor.viewport.appendChild(this.icon.viewport);

	};

	WineCheckout.prototype.normalizeAnchor = function() {

		var anchorElement = this.viewport.querySelector('.WineCheckout-select-area');

		if (anchorElement) {

			this.anchor.viewport = anchorElement;
			this.anchor.url = this.anchor.viewport.href;

			return true;

		}

		return false;

	};

	WineCheckout.prototype.normalize = function() {

		if (this.normalizeAnchor()) {

			this.buttonTitle.viewport = this.anchor.viewport.querySelector('.WineCheckoutTitle');
			this.button.viewport = this.anchor.viewport.querySelector('.WineCheckoutButton');
			this.icon.viewport = this.anchor.viewport.querySelector('.WineCheckoutIcon');

			// get the button title
			if (!this.buttonTitle.viewport)
				this.appendAndBuildButtonTitle();

			// get the button
			if (!this.button.viewport)
				this.appendAndBuildButton();

			// get the icon
			if (!this.icon.viewport)
				this.appendAndBuildIcon();

		}

	};

	return WineCheckout;

})();