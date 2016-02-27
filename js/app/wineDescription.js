
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
			textClass: 'WineDescriptionShowMore-text',
			wrapperClass: 'WineDescription-wrapper'
		};

		this.wrapper = {};

		this.showMoreButton = {};

		this.limited = false;

		if (init)
			this.init();

		this.onClick = function() {

			self.toggleLimit();

		};

	}

	WineDescription.prototype.focus = function() {

		this.showMoreButton.button.focus();

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

		element.viewport = document.createElement('div');
		element.viewport.className = this.config.showMoreClass;

		element.button = document.createElement('a');
		element.button.className = this.config.buttonClass;

		element.buttonText = document.createElement('span');
		element.buttonText.className = this.config.textClass;
		element.buttonText.innerHTML = this.config.text;

		element.buttonIcon = document.createElement('span');
		element.buttonIcon.className = this.config.iconClass;

		element.button.appendChild(element.buttonText);
		element.button.appendChild(element.buttonIcon);

		element.viewport.appendChild(element.button);

		return element;

	};

	WineDescription.prototype.addShowMoreButton = function() {

		this.showMoreButton = this.buildShowMoreButton();
		this.showMoreButton.viewport.addEventListener('click', this.onClick);

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