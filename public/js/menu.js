
/* Mowe Menu 1.0 */

var Menu = (function () {

	/**
	 * @param viewport {Element}
	 */
	function Menu(viewport) {

		var self = this;

		this.viewport = viewport;

		this.backdrop = {};
		this.backdrop.defaultClass = 'Menu-backdrop';
		this.backdrop.isAppended = false;

		this.items = [];

		this.isActive = false;

		this.closeAnimationTime = 300;
		this.openAnimationTime = 100;

		this.onMenuItemClick = function (ev) {

			if (self.isActive)
				self.close();

		};

		this.onToggleClick = function (ev) {

			ev.preventDefault();
			self.toggle();

		};

		this.onBackdropClick = function(ev) {

			self.close();

		};

		this.onKeyDown = function (ev) {

			if (self.isActive)
				if (ev.keyCode == 27) {

					ev.preventDefault();
					self.close();

				}

		};

		// auto init the menu instance
		if (this.viewport)
			this.init();

	}

	Menu.prototype.close = function () {

		var self = this;

		if (this.isActive)
			this.isActive = false;

		this.viewport.classList.remove('is-active');
		this.viewport.classList.add('is-animating');

		document.body.classList.remove('has-menu');

		if (this.animationDelay)
			clearTimeout(this.animationDelay);

		this.animationDelay = setTimeout(function () {
			self.viewport.classList.remove('is-animating');
			self.detachBackdrop();
		}, this.closeAnimationTime);

	};

	Menu.prototype.open = function () {

		var self = this;

		if (!this.isActive)
			this.isActive = true;

		this.appendBackdrop();

		this.viewport.classList.add('is-active');
		this.viewport.classList.add('is-animating');

		document.body.classList.add('has-menu');

		if (this.animationDelay)
			clearTimeout(this.animationDelay);

		this.animationDelay = setTimeout(function () {
			self.viewport.classList.remove('is-animating');
		}, this.openAnimationTime);

	};

	Menu.prototype.toggle = function () {

		if (!this.isActive)
			this.open();
		else
			this.close();

	};

	Menu.prototype.detachBackdrop = function () {

		if (this.backdrop.viewport)
			this.backdrop.viewport.remove();

		this.backdrop.isAppended = false;

	};

	Menu.prototype.appendBackdrop = function () {

		if (!this.backdrop.viewport)
			this.backdrop.viewport = this.buildBackdrop();

		this.viewport.insertBefore(this.backdrop.viewport, this.viewport.firstChild);
		this.backdrop.isAppended = true;

	};

	Menu.prototype.buildBackdrop = function () {

		var backdrop = document.createElement('div');
		backdrop.className = this.backdrop.defaultClass;

		backdrop.addEventListener('click', this.onBackdropClick, false);

		return backdrop;

	};

	Menu.prototype.addListeners = function () {

		window.addEventListener('keydown', this.onKeyDown, false);

		if (this.items.length)
			for (var i = this.items.length; i--; )
				this.items[i].addEventListener('click', this.onMenuItemClick, false);

	};

	/**
	 * Find Menu items based on 'MenuItem-select-area' class
	 */
	Menu.prototype.getItems = function () {

		this.items = this.viewport.querySelectorAll('.MenuItem-select-area');

	};

	/**
	 * Find Menu backdrop element, if it not exists, build it
	 */
	Menu.prototype.initBackdrop = function () {

		this.backdrop.viewport = this.viewport.querySelector('.Menu-backdrop');

		if (this.backdrop.viewport) {
			this.backdrop.defaultClass = this.backdrop.viewport.className;
			this.backdrop.viewport.addEventListener('click', this.onBackdropClick, false);
		}

	};

	/**
	 * Find Toggle Buttons and add toggle listeners to this
	 */
	Menu.prototype.getToggleButton = function () {

		var toggleButton = this.viewport.querySelectorAll('.MenuToggleButton');

		for (var i = toggleButton.length; i--; )
			toggleButton[i].addEventListener('click', this.onToggleClick, false);

	};

	/**
	 * Init the Menu
	 */
	Menu.prototype.init = function () {

		this.getToggleButton();
		this.initBackdrop();

		this.getItems();

		this.addListeners();

		// force menu to close
		this.close();

	};

	return Menu;

})();