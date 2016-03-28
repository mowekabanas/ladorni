
/* Mowe Logo 1.0 */

var Logo = (function () {

	/**
	 * SVG Logo request
	 * @param viewport {Element}
	 * @param url {string}
	 * @param fallback {object}
	 * @constructor
	 */
	function Logo(viewport, url, fallback) {

		var self = this;

		this.viewport = viewport;
		this.url = url;
		this.fallback = fallback;

		this.get();

	}

	/**
	 * Append to element
	 * @param toElement {Element}
	 * @param before {Element}
	 */
	Logo.prototype.appendTo = function (toElement, before) {

		if (!before)
			toElement.appendChild(this.viewport);
		else
			toElement.insertBefore(this.viewport, before);

	};

	/**
	 * Clone the logo and append to element
	 * @param toElement {Element}
	 */
	Logo.prototype.cloneTo = function (toElement) {

		toElement.appendChild(this.viewport.cloneNode(this.viewport));

	};

	Logo.prototype.get = function () {

		var self = this;

		if (this.viewport && this.url) {

			var request = new XMLHttpRequest();
			request.open('GET', this.url, true);

			request.onreadystatechange = function() {

				if (this.readyState === 4)
					if (this.status == 200)
						if (this.responseText) {
							self.viewport.innerHTML = this.responseText;
							if (self.fallback)
								self.fallback();
						}

			};

			request.send();
			request = null;

		}

	};

	return Logo;

})();


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

		this.isActive = false;

		this.closeAnimationTime = 300;
		this.openAnimationTime = 100;

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

		this.addListeners();

		// force menu to close
		this.close();

	};

	return Menu;

})();

/* Navigation */

var Navigation = (function () {

	function Navigation(viewport, documentTarget) {

		var self = this;

		this.viewport = viewport;
		this.document = documentTarget;

		this.transition = {};

		this.title = {};

		this.title.default = 'La Dorni';
		this.title.defaultPrefix = 'La Dorni | ';
		this.title.defaultPostfix = ' | La Dorni';

		this.navigationItems = [];

		// Default pages
		this.home = false;
		this.error = false;

		this.onNavigationItemClick = function(ev) {

			if (this.dataset.navigationTarget) {

				ev.preventDefault();

				var item = self.queryNavigationItem(this.dataset.navigationTarget);

				if (item)
					self.setCurrentState(item);

			}

		};

		this.onPopStateCtrl = function (ev) {

			console.log(ev);

			var item = self.queryNavigationItem(history.state.name);

			if (item)
				self.setCurrentState(item, true);

		};

	}

	Navigation.prototype.pushItem = function(item, pageViewport) {

		var navigationItem = new NavigationItem(item, pageViewport);

		if (navigationItem.isHome)
			this.home = navigationItem;

		this.navigationItems.push(navigationItem);

	};

	Navigation.prototype.matchURL = function(pageURL) {

		return !!window.location.href.match(new RegExp(pageURL, 'g'));

	};

	Navigation.prototype.queryCurrentState = function () {

		for (var i = this.navigationItems.length; i--; )
			if (this.matchURL(this.navigationItems[i].url))
				return this.navigationItems[i];

		return this.home;

	};

	/**
	 * Build and return the new page title
	 * @param stateTitle {string|boolean}
	 * @return {*}
	 */
	Navigation.prototype.buildTitle = function(stateTitle) {

		if (this.title) {

			if (stateTitle) {

				if (this.title.defaultPostfix)
					return stateTitle + this.title.defaultPostfix;
				else if (this.title.defaultPrefix)
					return this.title.defaultPostfix + stateTitle;
				else
					return stateTitle;

			} else {

				return this.title.default;

			}

		} else {

			if (!stateTitle)
				return '';

		}

		return stateTitle;


	};

	/**
	 * Get the new title and set it
	 * @param state {object}
	 */
	Navigation.prototype.setTitle = function (state) {

		if (state)
			document.title = this.buildTitle(state.title);

	};

	Navigation.prototype.setCurrentState = function (item, replace) {

		var state = new NavigationState(item);

		if (history.state)
			if (state.name != history.state.name)
				if (this.transition)
					this.transition.start();

		if (state) {
			this.setTitle(state);
			if (replace)
				history.replaceState(state, state.title, state.url);
			else
				history.pushState(state, state.title, state.url);
		}

	};

	Navigation.prototype.queryNavigationItem = function(name) {

		for (var i = this.navigationItems.length; i--; )
			if (this.navigationItems[i].name == name)
				return this.navigationItems[i];

		return false;

	};

	Navigation.prototype.getTransition = function () {

		var transition = this.viewport.querySelector('.Transition');

		if (transition)
			this.transition = new Transition(transition, this);

	};

	Navigation.prototype.addListeners = function () {

		window.addEventListener('popstate', this.onPopStateCtrl, false);

		var navAnchors = this.document.querySelectorAll('.NavigationItem');

		for (var i = navAnchors.length; i--; )
			navAnchors[i].addEventListener('click', this.onNavigationItemClick, false);

	};

	Navigation.prototype.init = function() {

		this.addListeners();

		this.getTransition();

		if (this.navigationItems.length)
			this.setCurrentState(this.queryCurrentState());

	};

	return Navigation;

})();

/* Navigation Item */

var NavigationItem = (function() {

	/**
	 * Naviagation Item constructor
	 * @param parameters {object}
	 * @param pageViewport {Element}
	 * @constructor
	 */
	function NavigationItem(parameters, pageViewport) {

		this.name = parameters.itemName;
		this.title = parameters.itemTitle;
		this.url = parameters.itemURL;

		this.isHome = parameters.isHome || false;

		this.page = this.getPage(pageViewport);

	}

	NavigationItem.prototype.getPage = function(viewport) {

		return new Page(viewport);

	};

	return NavigationItem;

})();

/* NavigationState */

var NavigationState = (function () {

	/**
	 * Navigation State constructor
	 * @param item {object}
	 * @constructor
	 */
	function NavigationState(item) {

		this.name = item.name || false;
		this.title = item.title || false;
		this.url = item.url || false;

	}

	return NavigationState;

})();

/* Navigation Item Page element */

var Page = (function() {

	/**
	 * Navigation Item Page constructor
	 * It normalize the page viewport
	 * @param viewport {Element}
	 * @return {*|boolean}
	 * @constructor
	 */
	function Page(viewport) {

		this.viewport = viewport || false;

	}

	return Page;

})();

/* Transition */

var Transition = (function () {

	function Transition(viewport, navigation) {

		var self = this;

		this.viewport = viewport;
		this.navigation = navigation;

	}

	Transition.prototype.start = function() {

		var self = this;

		this.navigation.viewport.classList.add('is-transiting');

		setTimeout(function () {

			self.navigation.viewport.classList.remove('is-transiting');

		}, 1600);

	};

	Transition.prototype.init = function () {

	};

	return Transition;

})();

/* Transition State */

var TransitionState = (function () {

	/**
	 * Transition State constructor
	 * @constructor
	 */
	function TransitionState() {

		var self = this;

	}

	return TransitionState;

})();

/*!
 * Mowe Wine v1.4.0 (http://getvilla.org/)
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
			activeClass: 'is-active',
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

		this.onClickToToggle = function(ev) {

			ev.preventDefault();
			self.toggle();

		};

		this.onClickToShowDescription = function(ev) {

			ev.preventDefault();

			self.description.toggleLimit();

			if (self.checkoutButton.getAnchor())
				self.checkoutButton.getAnchor().focus();

		};

		this.onKeyDownToToggle = function(ev) {

			if (self.isActive) {

				if (ev.keyCode == 37) // left arrow key
					self.expand();
				else if (ev.keyCode == 39) // right arrow key
					self.unexpand();

			}

		};

		if (init)
			this.init();

	}

	/**
	 * Expands the wine item if this are unexpanded
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
				self.description.addLimit();

				if (self.description)
					self.description.getAnchor().focus();

				if (self.checkoutButton)
					self.checkoutButton.getAnchor().enableFocus();

			}, this.config.animateDelay);

		}

	};

	/**
	 * unexpand the wine item if this are expanded
	 */
	Wine.prototype.unexpand = function() {

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

				if (self.description)
					self.description.getAnchor().disableFocus();

				if (self.checkoutButton)
					self.checkoutButton.getAnchor().disableFocus();

				self.showMoreButton.getAnchor().focus();

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
			this.unexpand();

	};

	Wine.prototype.active = function() {

		if (!this.isActive) {

			this.isActive = true;

			this.viewport.classList.add(this.config.activeClass);

			this.description.getAnchor().enableFocus();

			if (this.isExpanded)
				this.description.getAnchor().focus();
			else
				this.showMoreButton.getAnchor().focus();

		}

	};

	Wine.prototype.inactive = function() {

		if (this.isActive) {

			this.isActive = false;

			this.viewport.classList.remove(this.config.activeClass);

			this.description.disableFocus();
			this.showMoreButton.disableFocus();

		}

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

		if (this.description)
			this.description.getAnchor().addListener(this.onClickToShowDescription);

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
		this.showMoreButton.anchor.viewport.addEventListener('click', this.onClickToToggle, false);

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
			this.viewport.insertBefore(this.background.viewport, this.inner.viewport);

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
			this.active();
		else
			this.inactive();

		this.addListeners();

	};

	return Wine;

})();

/* Wine Anchor */

var WineAnchor = (function() {

	function WineAnchor(viewport) {

		this.viewport = viewport;

		var isActive = !!this.viewport;

		if (isActive) {

			if (this.viewport.hasAttribute('href')) {

				this.url = this.viewport.href;
				this.hasFocus = true;

			} else {

				this.url = '#';
				this.hasFocus = false;

			}

		}

	}

	/**
	 * Add focus to anchor element
	 */
	WineAnchor.prototype.focus = function() {

		if (!this.hasFocus)
			this.enableFocus();

		this.getViewport().focus();

	};

	/**
	 * Remove focus from anchor element
	 */
	WineAnchor.prototype.blur = function() {

		this.getViewport().blur();

	};

	/**
	 * Allow to get focus to anchor element
	 */
	WineAnchor.prototype.enableFocus = function() {

		this.hasFocus = true;

		this.getViewport().href = this.url;

	};

	/**
	 * Avoid to get focus to anchor element
	 */
	WineAnchor.prototype.disableFocus = function() {

		this.hasFocus = false;

		this.getViewport().removeAttribute('href');
		this.blur();

	};

	/**
	 * Getter from focus
	 * @return {Element}
	 */
	WineAnchor.prototype.getViewport = function() {

		return this.viewport;

	};

	/**
	 * Getter from URL
	 * @return {*|string|string}
	 */
	WineAnchor.prototype.getURL = function() {

		return this.url;

	};

	/**
	 * Add 'click' listener to anchor
	 * @param listener {function}
	 */
	WineAnchor.prototype.addListener = function(listener) {

		if (this.viewport.addEventListener)
			this.viewport.addEventListener('click', listener, false);
		else
			this.viewport.attachEvent('onclick', listener);

	};

	return WineAnchor;

})();

/* Wine Checkout button */

var WineCheckout = (function() {

	/**
	 * Return a normalized checkout button
	 * @param viewport
	 * @return {WineCheckout}
	 * @constructor
	 */
	function WineCheckout(viewport) {

		this.viewport = viewport;

		this.anchor = {};

		this.buttonTitle = {};
		this.button = {};
		this.icon = {};

		this.hasFocus = false;

		this.normalize();

		return this;

	}

	/**
	 * Getter to the Anchor
	 * @return {{}|*}
	 */
	WineCheckout.prototype.getAnchor = function() {

		return this.anchor;

	};

	/**
	 * Append and build the title element
	 */
	WineCheckout.prototype.appendAndBuildButtonTitle = function() {

		var element = document.createElement('span');
		element.className = 'WineCheckoutTitle';

		var text = document.createElement('span');
		text.className = 'Wine-anchor-text';
		text.innerHTML = 'Ir para loja online';

		element.appendChild(text);

		this.buttonTitle.viewport = element;
		this.anchor.viewport.appendChild(this.buttonTitle.viewport);

	};

	/**
	 * Append and build the button element
	 */
	WineCheckout.prototype.appendAndBuildButton = function() {

		var element = document.createElement('span');
		element.className = 'WineCheckoutButton';

		this.button.viewport = element;
		this.anchor.viewport.appendChild(this.button.viewport);

	};

	/**
	 * Append and build the icon element
	 */
	WineCheckout.prototype.appendAndBuildIcon = function() {

		var element = document.createElement('span');
		element.className = 'WineCheckoutIcon';

		var icon = document.createElement('span');
		icon.className = 'WineCheckoutIcon-icon icon-basket';

		element.appendChild(icon);

		this.icon.viewport = element;
		this.anchor.viewport.appendChild(this.icon.viewport);

	};

	/**
	 * Normalize the anchor
	 * @return {boolean}
	 */
	WineCheckout.prototype.normalizeAnchor = function() {

		var anchorElement = this.viewport.querySelector('.WineCheckout-select-area');

		if (anchorElement) {

			this.anchor = new WineAnchor(anchorElement);

			return true;

		}

		return false;

	};

	/**
	 * Normalize the Checkout button
	 */
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
var WineList = (function() {

	/**
	 * Constructor of the winelist
	 * @param viewport {object}
	 * @param options {object|boolean}
	 * @param init {boolean}
	 * @constructor
	 */
	function WineList(viewport, options, init) {

		this.viewport = viewport;

		this.options = {} || options;
		this.options.wineClass = '.Wine';

		this.wines = [];

		if (init)
			this.init();

	}

	/**
	 * Init the winelist
	 * Get all the wines element and get the model of this
	 */
	WineList.prototype.init = function() {

		var wines = this.viewport.querySelectorAll(this.options.wineClass);

		for (var i = wines.length; i--; )
			this.wines.push(new Wine(wines[i], false, true));

	};

	return WineList;

})();

/* Wine Show More button */

var WineShowMore = (function() {

	/**
	 * Return the Wine Show More button
	 * @return {WineShowMore}
	 * @constructor
	 */
	function WineShowMore() {

		this.build();

		this.hasFocus = false;

	}

	/**
	 * Getter to the Anchor
	 * @return {{}|*}
	 */
	WineShowMore.prototype.getAnchor = function() {

		return this.anchor;

	};

	/**
	 * Build the spans elements
	 * @param className
	 * @return {Element}
	 */
	WineShowMore.prototype.buildSpan = function(className) {

		var element = document.createElement('span');
		element.className = className ? className : '';

		return element;

	};

	/**
	 * Build the title element
	 * @return {Element}
	 */
	WineShowMore.prototype.buildTitle = function() {

		var element = document.createElement('span');
		element.className = 'WineShowMoreTitle';

		element.openText = document.createElement('span');
		element.openText.className = 'Wine-anchor-text WineShowMoreTitle-text WineShowMoreTitle-text--opened';
		element.openText.innerHTML = 'Fechar';

		element.closeText = document.createElement('span');
		element.closeText.className = 'Wine-anchor-text WineShowMoreTitle-text WineShowMoreTitle-text--closed';
		element.closeText.innerHTML = 'Mais Informações';

		element.appendChild(element.openText);
		element.appendChild(element.closeText);

		return element;

	};

	WineShowMore.prototype.buildButton = function() {

		var element = document.createElement('span');
		element.className = 'WineShowMoreButton';

		return element;

	};

	WineShowMore.prototype.buildIcon = function() {

		var element = document.createElement('span');
		element.className = 'WineShowMoreIcon';

		element.openIcon = document.createElement('span');
		element.openIcon.className = 'WineShowMoreIcon-icon WineShowMoreIcon-icon--open';
		element.openIcon.appendChild(this.buildSpan('icon-angle-left'));

		element.closeIcon = document.createElement('span');
		element.closeIcon.className = 'WineShowMoreIcon-icon WineShowMoreIcon-icon--close';
		element.closeIcon.appendChild(this.buildSpan('icon-angle-right'));

		element.appendChild(element.openIcon);
		element.appendChild(element.closeIcon);

		return element;

	};

	/**
	 * Build the anchor element
	 * @return {Element}
	 */
	WineShowMore.prototype.buildAnchor = function() {

		var element = document.createElement('a');
		element.className = 'WineShowMore-select-area';
		element.href = '#';

		return element;

	};

	/**
	 * Build the Wine Show More button elements
	 */
	WineShowMore.prototype.build = function () {

		this.viewport = document.createElement('section');
		this.viewport.className = 'WineShowMore';

		this.anchor = {};
		this.buttonTitle = {};
		this.button = {};
		this.icon = {};

		this.anchor = new WineAnchor(this.buildAnchor());

		this.buttonTitle.viewport = this.buildTitle();
		this.button.viewport = this.buildButton();
		this.icon.viewport = this.buildIcon();

		this.anchor.viewport.appendChild(this.buttonTitle.viewport);
		this.anchor.viewport.appendChild(this.button.viewport);
		this.anchor.viewport.appendChild(this.icon.viewport);

		this.viewport.appendChild(this.anchor.viewport);

	};

	return WineShowMore;

})();