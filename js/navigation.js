
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