
/* Navigation Item Page element */

var Page = (function() {

	/**
	 * Navigation Item Page constructor
	 * It normalize the page viewport
	 * @param viewport {Node}
	 * @param url {string}
	 * @return {*|boolean}
	 * @constructor
	 */
	function Page(viewport, url) {

		var self = this;

		this.viewport = viewport || false;
		this.url = url || false;

		this.document = false;

		this.content = {};

		this.header = {};
		this.header.background = {};
		this.header.overlay = {};

		this.hero = {};

		// it loads with a FURY emergency
		// the page just loads when it load
		this.content.required = {};
		this.content.required.require = new Require();
		this.content.required.unloader = new Unloader();
		this.content.required.queryString = '';

		// it loads without emergency
		this.content.unloaded = {};
		this.content.unloaded.unloader = new Unloader();
		this.content.unloaded.queryString = '';

		this.afterDone = false;
		this.afterLoad = false;

		this.autoLoad = false;
		this.isActive = false;
		this.isLoaded = false;

		this.state = {
			active: 'is-active',
			loading: 'is-loading'
		};

		/**
		 * When this Page is the first to load
		 * It calls the main function of the page
		 */
		this.onFirstPageLoad = function () {

			if (self.document.start)
				self.document.start();

		};

		/**
		 * Done event
		 * It calls when the required content is loaded
		 */
		this.done = function () {

			self.isLoaded = true;

			if (self.content.required.require.isLoaded) {

 				if (self.content.unloaded.unloader)
					self.content.unloaded.unloader.load();

				if (self.document)
					if (self.document.navigation)
						if (self.document.navigation.changePageCount == 1 || self.document.navigation.changePageCount == 0)
							self.onFirstPageLoad();

				if (self.afterDone)
					self.afterDone();

			}

		};

		/**
		 * Load the content
		 */
		this.load = function () {

			if (!self.content.required.unloader.isLoaded) {

				self.content.required.unloader.load();

				if (self.afterLoad)
					self.afterLoad();

			}

			self.isLoaded = true;

		};

		/**
		 * Unload, require and load the content
		 * @param autoLoad {boolean}
		 * @return {boolean}
		 */
		this.requireContent = function (autoLoad) {

			if (self.content.unloaded.queryString)
				if (!self.isLoaded)
					if (!self.content.unloaded.unloader.elements.length) {

						self.content.unloaded.elements = self.content.viewport.querySelectorAll(self.content.unloaded.queryString);

						self.content.unloaded.unloader.elements = self.content.unloaded.elements;
						self.content.unloaded.unloader.init();

					}

			if (self.content.required.queryString) {

				if (!self.isLoaded)
					if (!self.content.required.unloader.elements.length) {

						self.content.required.elements = self.content.viewport.querySelectorAll(self.content.required.queryString);

						self.content.required.unloader.elements = self.content.required.elements;
						self.content.required.unloader.init();

						self.content.required.require.elements = self.content.required.elements;
						self.content.required.require.listener = self.done;
						self.content.required.require.init();

					}

				return !!autoLoad;

			} else {

				if (!self.isLoaded) {

					self.content.required.require.isLoaded = true;
					self.done();

				}

			}

			return false;

		};

		if (this.viewport)
			this.init(false);

	}

	/**
	 * Based on 'active' param, it set the 'active' state state from the viewport
	 * @param active
	 * @return {boolean}
	 */
	Page.prototype.setActive = function (active) {

		if (this.viewport) {

			if (this.isActive = !!active)
				this.viewport.classList.add(this.state.active);
			else
				this.viewport.classList.remove(this.state.active);

			return true;

		}

		return false;

	};

	/**
	 * Get the current active state
	 * By default, it fix the 'active' class state
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

	Page.prototype.getSlide = function () {

		if (this.hero.viewport)
			this.slider = new PageSlider(this);

	};

	Page.prototype.getHeader = function () {

		// get the 'header' element
		this.header.viewport = this.viewport.querySelector('.PageHeader');

		// try get the 'background' and 'overlay' elements
		if (this.header.viewport) {

			this.header.background.viewport = this.header.viewport.querySelector('.PageHeader-background');
			this.header.overlay.viewport = this.header.viewport.querySelector('.PageHeader-overlay');

			// get the hero slider
			this.getSlide();

		}

	};

	/**
	 * Get the content file of the Page (winery.html, castle.html, winemenu.html)
	 */
	Page.prototype.getPageFile = function () {

		var self = this;

		if (this.content.viewport)
			this.fileAppend = new FileAppend(this.content.viewport, this.url, function () {

				if (self.requireContent(self.autoLoad))
					self.load();

			});

	};

	/**
	 * It inits and normalize the Page
	 * By default, it set to false the 'active' state
	 * @param isActive {boolean}
	 */
	Page.prototype.init = function (isActive) {

		// if this has url, append the file to 'this.content.viewport'
		if (this.url)
			this.getPageFile();

		// normalize the 'active' state
		this.setActive(!!isActive);

		// try get relationship to Hero Slider and Header
		this.getHeader();

	};

	return Page;

})();