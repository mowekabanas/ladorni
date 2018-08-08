
/* Wine Description */

var WineDescription = (function() {

	function WineDescription(viewport, init) {

		var self = this;

		this.viewport = viewport;

		this.config = {
			buttonClass: 'WineDescriptionShowMore-button',
			iconClass: 'WineDescriptionShowMore-icon icon-down-dir',
			showMoreClass: 'WineDescriptionShowMore',
			text: 'Continuar lendo',
			textClass: 'WineDescriptionShowMore-text Wine-anchor-text',
			wrapperClass: 'WineDescription-wrapper'
		};

		this.wrapper = {};
		this.showMoreButton = {};

		this.hasFocus = false;

		this.limited = false;

		if (init)
			this.init();

	}

	/**
	 * Getter to the Anchor
	 * @return {*|{}}
	 */
	WineDescription.prototype.getAnchor = function() {

		return this.showMoreButton.anchor;

	};

	WineDescription.prototype.addLimit = function() {

		if (!this.limited) {

			this.limited = true;
			this.viewport.classList.add('is-limited');

		}

	};

	WineDescription.prototype.removeLimit = function() {

		if (this.limited) {

			this.limited = false;
			this.viewport.classList.remove('is-limited');

		}

	};

	WineDescription.prototype.toggleLimit = function() {

		if (this.limited)
			this.removeLimit();
		else
			this.addLimit();

	};

	WineDescription.prototype.getTextSize = function() {

		var paragraphs = this.viewport.querySelectorAll('p');

		var size = 0;

		for (var i = paragraphs.length; i--; )
			size += paragraphs[i].innerHTML.length;

		return size;

	};

	WineDescription.prototype.buildShowMoreButton = function() {

		var element = {};

		element.anchor = {};
		element.buttonText = {};
		element.buttonIcon = {};

		element.viewport = document.createElement('div');
		element.viewport.className = this.config.showMoreClass;

		element.anchor = new WineAnchor(document.createElement('a'));
		element.anchor.viewport.className = this.config.buttonClass;

		element.buttonText.viewport = document.createElement('span');
		element.buttonText.viewport.className = this.config.textClass;
		element.buttonText.viewport.innerHTML = this.config.text;

		element.buttonIcon.viewport = document.createElement('span');
		element.buttonIcon.viewport.className = this.config.iconClass;

		element.anchor.viewport.appendChild(element.buttonText.viewport);
		element.anchor.viewport.appendChild(element.buttonIcon.viewport);

		element.viewport.appendChild(element.anchor.viewport);

		return element;

	};

	WineDescription.prototype.addShowMoreButton = function() {

		this.showMoreButton = this.buildShowMoreButton();

		var wrapper = this.wrapper.viewport ? this.wrapper : this;
		wrapper.viewport.appendChild(this.showMoreButton.viewport);

	};

	WineDescription.prototype.hasTextLimit = function() {

		return this.viewport.classList.contains('is-limited');

	};

	WineDescription.prototype.init = function() {

		if (this.hasTextLimit())
			this.limited = true;

		this.wrapper.viewport = this.viewport.querySelector('.' + this.config.wrapperClass);
		this.addShowMoreButton();

	};

	return WineDescription;

})();