
/* Wine */

var Wine = (function() {

	/**
	 * Wine Constructor
	 * @param viewport
	 * @param options {object|boolean}
	 * @param init {boolean}
	 * @constructor
	 */
	function Wine(viewport, options, init) {

		var self = this;

		this.viewport = viewport;

		this.options = options || {};

		this.config = {
			expandClass: 'is-expanded',
			animateClass: 'is-animated',
			animateDelay: 400
		};

		this.inner = {};

		this.description = {};
		this.header = {};
		this.figure = {};
		this.footer = {};

		this.showMoreButton = {};

		this.animationTimer = 0;

		this.isExpanded = false;
		this.isActive = false;

		this.onClickToToggle = function() {

			self.toggle();

		};

		this.onKeyDownToToggle = function(ev) {

			if (self.isActive) {

				if (ev.keyCode == 13) // return key
					self.toggle();
				else if (ev.keyCode == 37) // left arrow key
					self.expand();
				else if (ev.keyCode == 39) // right arrow key
					self.close();

			}

		};

		if (init)
			this.init();

	}

	Wine.prototype.expand = function() {

		var self = this;

		if (!this.isExpanded) {

			this.isExpanded = true;

			this.viewport.classList.add(this.config.expandClass);
			this.viewport.classList.add(this.config.animateClass);

			if (this.animationTimer)
				clearTimeout(this.animationTimer);

			this.animationTimer = setTimeout(function() {

				self.viewport.classList.remove(self.config.animateClass);
				self.description.focus();

			}, this.config.animateDelay);

		}

	};

	Wine.prototype.close = function() {

		var self = this;

		if (this.isExpanded) {

			this.isExpanded = false;

			this.viewport.classList.remove(this.config.expandClass);
			this.viewport.classList.add(this.config.animateClass);

			if (this.animationTimer)
				clearTimeout(this.animationTimer);

			this.animationTimer = setTimeout(function() {

				self.viewport.classList.remove(self.config.animateClass);
				self.description.addLimit();

			}, this.config.animateDelay);

		}

	};

	Wine.prototype.toggle = function() {

		if (!this.isExpanded)
			this.expand();
		else
			this.close();

	};

	Wine.prototype.cloneResume = function() {

		var c, content, empty, i, figure;

		c = '';

		empty = [];

		figure = this.viewport.querySelectorAll('.WineResume');

		for (i = figure.length; i--; ) {

			c = figure[i].querySelectorAll('.WineResumeList');

			if (c.length)
				content = c[0];
			else empty.push(figure[i]);

		}

		for (i = empty.length; i--; ) {

			c = content.cloneNode(true);
			empty[i].appendChild(c);

		}

	};

	Wine.prototype.getDescription = function() {

		var descriptionViewport = this.viewport.querySelector('.WineDescription');

		if (descriptionViewport) {

			this.description = new WineDescription(descriptionViewport);
			this.description.init();

		}

	};

	Wine.prototype.addListeners = function() {

		var self = this;

		if (this.showMoreButton.viewport)
			this.showMoreButton.viewport.addEventListener('click', this.onClickToToggle, false);

		window.addEventListener('keydown', this.onKeyDownToToggle, false);

	};

	Wine.prototype.appendShowMoreButton = function() {

		this.showMoreButton = new WineShowMore();
		this.viewport.appendChild(this.showMoreButton.viewport);

	};

	/**
	 * Init the wine
	 */
	Wine.prototype.init = function() {

		this.inner.viewport = this.viewport.querySelector('.Wine-inner');

		this.header.viewport = this.viewport.querySelector('.WineHeader');
		this.figure.viewport = this.viewport.querySelector('.WineFigure');
		this.footer.viewport = this.viewport.querySelector('.WineFooter');

		this.appendShowMoreButton();

		if (this.viewport.classList.contains('is-expanded'))
			this.isExpanded = true;

		if (this.viewport.classList.contains('is-active'))
			this.isActive = true;

		this.cloneResume();
		this.addListeners();
		this.getDescription();

	};

	return Wine;

})();