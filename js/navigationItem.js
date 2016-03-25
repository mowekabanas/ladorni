
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