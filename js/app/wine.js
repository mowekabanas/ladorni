
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

		this.header = {};
		this.figure = {};
		this.footer = {};

		this.showMoreButton = {};

		this.animationTimer = 0;

		this.expanded = false;

		this.onClickToToggle = function() {

			self.toggle();

		};

		if (init) this.init();

	}

	Wine.prototype.expand = function() {

		var self = this;

		if (!this.expanded) {

			this.expanded = true;

			this.viewport.classList.add(this.config.expandClass);
			this.viewport.classList.add(this.config.animateClass);

			if (this.animationTimer)
				clearTimeout(this.animationTimer);

			this.animationTimer = setTimeout(function() {

				self.viewport.classList.remove(self.config.animateClass);

			}, this.config.animateDelay);

		}

	};

	Wine.prototype.close = function() {

		var self = this;

		if (this.expanded) {

			this.expanded = false;

			this.viewport.classList.remove(this.config.expandClass);
			this.viewport.classList.add(this.config.animateClass);

			if (this.animationTimer)
				clearTimeout(this.animationTimer);

			this.animationTimer = setTimeout(function() {

				self.viewport.classList.remove(self.config.animateClass);

			}, this.config.animateDelay);

		}

	};

	Wine.prototype.toggle = function() {

		if (!this.expanded)
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

		if (descriptionViewport)
			this.description = new WineDescription(descriptionViewport, true);

	};

	Wine.prototype.addListeners = function() {

		if (this.showMoreButton)
			this.showMoreButton.viewport.addEventListener('click', this.onClickToToggle, false);

	};

	/**
	 * Init the wine
	 */
	Wine.prototype.init = function() {

		this.inner.viewport = this.viewport.querySelector('.Wine-inner');

		this.header.viewport = this.viewport.querySelector('.WineHeader');
		this.figure.viewport = this.viewport.querySelector('.WineFigure');
		this.footer.viewport = this.viewport.querySelector('.WineFooter');

		this.showMoreButton.viewport = this.viewport.querySelector('.WineShowMore');

		if (this.viewport.classList.contains('is-expanded'))
			this.expanded = true;

		this.cloneResume();
		this.addListeners();
		this.getDescription();

	};

	return Wine;

})();