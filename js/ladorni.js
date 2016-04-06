
/* LaDorni Site */

var LaDorni = (function () {

	/**
	 * LaDorni Site constructor
	 * @constructor
	 */
	function LaDorni(viewport) {

		this.viewport = viewport;

		this.logo = false;

		this.winemenu = {};
		this.winery = {};
		this.castle = {};

		this.navigation = false;

		/* Get Pages viewports */

		// Home
		this.home = new Page();

		// Winemenu
		this.winemenu = new Page();

		// Winery
		this.winery = new Page();

		// Castle
		this.castle = new Page();

	}

	/**
	 * This is the MAIN function to start the page
	 * ANY ERRORS and all the page doesn't OPEN
	 * It remove the states 'is-biting' and 'is-starting'
	 * It init the navigation
	 */
	LaDorni.prototype.start = function () {

		console.log('HEEEEEEEY! I" HERE BITCHES');

		// hide all, show the '.TransitionScreen--start' element, start the loadBar
		document.body.classList.remove('is-biting');
		document.body.classList.remove('is-starting');

		// init the navigation
		this.navigation.init();

	};

	LaDorni.prototype.getHome = function () {

		var self = this;

		if (this.home) {

			this.home.viewport = document.getElementById('home');
			this.home.content.viewport = document.getElementById('hero-photos');
			this.home.requiredContentQueryString = 'img';

			this.home.afterDone = function () {

				//console.log('carregado');

			};

			this.home.afterLoad = function () {

				//console.log('baixando');

			};

		}

	};

	LaDorni.prototype.getWineList = function () {

		this.winemenu.wineList = new WineList(document.documentElement);
		this.winemenu.wineList.init();

	};

	LaDorni.prototype.getWineMenu = function() {

		var self = this;

		if (this.winemenu) {

			this.winemenu.viewport = document.getElementById('winemenu');
			this.winemenu.url = 'winemenu.html';
			this.winemenu.hero = new Hero(document.getElementById('winemenu-hero'));
			this.winemenu.content.viewport = document.getElementById('vinhos');
			this.winemenu.requiredContentQueryString = '.WineFigure-img';

			this.winemenu.afterDone = function () {

				if (document.body.classList.contains('is-winemenu'))
					self.navigation.removeDocumentState('is-loading');

			};

			this.winemenu.afterLoad = function () {

				self.getWineList();

			};

		}

	};

	LaDorni.prototype.getWinery = function () {

		var self = this;

		if (this.winery) {

			this.winery.viewport = document.getElementById('winery');
			this.winery.url = 'winery.html';
			this.winery.hero = new Hero(document.getElementById('winery-hero'));
			this.winery.content.viewport = document.getElementById('vinicola');
			this.winemenu.requiredContentQueryString = '.WineFigure-img';

		}

	};

	LaDorni.prototype.getCastle = function() {

		var self = this;

		if (this.castle) {

			this.castle.viewport = document.getElementById('castle');
			this.castle.url = 'castle.html';
			this.castle.hero = new Hero(document.getElementById('castle-hero'));
			this.castle.content.viewport = document.getElementById('castelo');

		}

	};

	LaDorni.prototype.init = function(autoNavigationInit) {

		this.getHome();
		this.getWineMenu();
		this.getWinery();
		this.getCastle();

		/* Init pages */

		if (this.home.viewport)
			this.home.init();

		if (this.winemenu.viewport)
			this.winemenu.init();

		if (this.winery.viewport)
			this.winery.init();

		if (this.castle.viewport)
			this.castle.init();

		/* Init navigation */

		if (autoNavigationInit)
			this.navigation.init();

	};

	return LaDorni;

})();