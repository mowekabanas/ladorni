
/*!
 * Mowe Wine v1.0.0 (http://getvilla.org/)
 * Copyright 2013-2015 Kabana's Info & Mowe
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

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
		this.background = {};

		this.description = {};
		this.header = {};
		this.figure = {};
		this.footer = {};
		this.showMoreButton = {};

		this.checkoutButton = {};

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

	/**
	 * Expands the wine item if this are closed
	 */
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

	/**
	 * Close the wine item if this are expanded
	 */
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

	/**
	 * Toggle the 'is-expanded' state
	 */
	Wine.prototype.toggle = function() {

		if (!this.isExpanded)
			this.expand();
		else
			this.close();

	};

	/**
	 * Clone the Wine Resume (duplicate it to footer and header)
	 */
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

	/**
	 * Add keyboard listeners
	 */
	Wine.prototype.addListeners = function() {

		// keydown listener
		window.addEventListener('keydown', this.onKeyDownToToggle, false);

	};

	/**
	 * Normalize the 'checkout' button
	 */
	Wine.prototype.normalizeCheckout = function() {

		if (this.footer.viewport) {

			var checkoutElement = this.footer.viewport.querySelector('.WineCheckout');

			if (checkoutElement)
				this.checkoutButton = new WineCheckout(checkoutElement);

		}

	};

	/**
	 * Normalize the 'Show More' button
	 */
	Wine.prototype.normalizeShowMoreButton = function() {

		var showMoreElement = this.viewport.querySelector('.WineShowMore');

		if (!showMoreElement) {

			this.showMoreButton = new WineShowMore();
			this.viewport.appendChild(this.showMoreButton.viewport);

		} else {

			this.showMoreButton.viewport = showMoreElement;

		}

		// add the click listener
		this.showMoreButton.viewport.addEventListener('click', this.onClickToToggle, false);

	};

	/**
	 * Normalize the wine footer description
	 */
	Wine.prototype.normalizeDescription = function() {


		var descriptionViewport = this.viewport.querySelector('.WineDescription');

		if (descriptionViewport) {

			this.description = new WineDescription(descriptionViewport);
			this.description.init();

		}

	};

	/**
	 * Normalize the Wine Footer
	 */
	Wine.prototype.normalizeFooter = function() {

		// get the Wine Footer element
		this.footer.viewport = this.viewport.querySelector('.WineFooter');

	};

	/**
	 * Normalize the Wine Figure
	 */
	Wine.prototype.normalizeFigure = function() {

		// get the Wine Figure element
		this.figure.viewport = this.viewport.querySelector('.WineFigure');

	};

	/**
	 * Normalize the Wine Header
	 */
	Wine.prototype.normalizeHeader = function() {

		// get the Wine Header element
		this.header.viewport = this.viewport.querySelector('.WineHeader');

	};

	/**
	 * Normalize the Wine element
	 */
	Wine.prototype.normalizeWine = function() {

		// get background element
		var backgroundElement = this.viewport.querySelector('.Wine-background');

		// if the background not exists, build it
		if (!backgroundElement) {

			backgroundElement = document.createElement('div');
			backgroundElement.className = 'Wine-background';

		}

		this.background.viewport = backgroundElement;

		// get inner element
		this.inner.viewport = this.viewport.querySelector('.Wine-inner');

		// if has inner element, append the background before
		if (this.inner.viewport)
			this.viewport.insertBefore(this.background.viewport, this.inner.viewport)

	};

	/**
	 * Normalize all the things and clone the resume
	 */
	Wine.prototype.normalize = function() {

		this.normalizeWine();
		this.normalizeHeader();
		this.normalizeFigure();
		this.normalizeFooter();
		this.normalizeShowMoreButton();
		this.normalizeDescription();
		this.normalizeCheckout();

		this.cloneResume();

	};

	/**
	 * Init the Wine element
	 */
	Wine.prototype.init = function() {

		this.normalize();

		if (this.viewport.classList.contains('is-expanded'))
			this.isExpanded = true;

		if (this.viewport.classList.contains('is-active'))
			this.isActive = true;

		this.addListeners();

	};

	return Wine;

})();