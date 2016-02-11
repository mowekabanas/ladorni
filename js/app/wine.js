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

		this.inner = {};

		this.header = {};
		this.figure = {};
		this.footer = {};

		this.active = false;

		this.onHeaderClick = function() {

			self.active = !self.active;

			if (self.active) {

				self.viewport.classList.add('is-active');

				self.footer.viewport.classList.add('is-hidden');

				setTimeout(function() {

					self.footer.viewport.classList.remove('is-hidden');

				}, 10);

			} else {

				self.viewport.classList.remove('is-active');
				self.footer.viewport.classList.remove('is-hidden');

			}

		};

		if (init) this.init();

	}

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

	Wine.prototype.addListeners = function() {

		if (this.header.viewport)
			this.header.viewport.addEventListener('click', this.onHeaderClick, false);

	};

	/**
	 * Init the wine
	 */
	Wine.prototype.init = function() {

		this.inner.viewport = this.viewport.querySelector('.Wine-inner');

		this.header.viewport = this.viewport.querySelector('.WineHeader');
		this.figure.viewport = this.viewport.querySelector('.WineFigure');
		this.footer.viewport = this.viewport.querySelector('.WineFooter');

		if (this.viewport.classList.contains('is-active'))
			this.active = true;

		this.cloneResume();

		this.addListeners();

	};

	return Wine;

})();