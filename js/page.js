
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

		this.content = {};
		this.requiredContentQueryString = '';

		this.header = {};
		this.header.background = {};
		this.header.overlay = {};

		this.hero = {};

		this.require = new Require();
		this.unloader = new Unloader();

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
		 * Done event
		 * It calls when the required content is loaded
		 */
		this.done = function () {

			self.isLoaded = true;

			if (self.afterDone)
				self.afterDone();

		};

		/**
		 * Load the content
		 */
		this.load = function () {

			if (!self.unloader.isLoaded) {

				self.unloader.load();

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

			if (self.requiredContentQueryString) {

				if (!self.isLoaded) {

					self.requiredContent = self.content.viewport.querySelectorAll(self.requiredContentQueryString);

					self.unloader.elements = self.requiredContent;
					self.unloader.init();

					self.require.elements = self.requiredContent;
					self.require.listener = self.done;
					//self.require.init();

				}

				return !!autoLoad;

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
		else if (this.requireContent(this.autoLoad))
			this.load();

		// normalize the 'active' state
		this.setActive(!!isActive);

		// try get relationship to Hero Slider and Header
		this.getHeader();

	};

	return Page;

})();