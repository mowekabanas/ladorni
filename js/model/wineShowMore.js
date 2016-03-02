
/* Wine Show More button */

var WineShowMore = (function() {

	/**
	 * Return the Wine Show More button
	 * @return {WineShowMore}
	 * @constructor
	 */
	function WineShowMore() {

		this.viewport = this.build();

		return this;

	}

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

		return element;

	};

	/**
	 * Build the Wine Show More button elements
	 * @return {Element}
	 */
	WineShowMore.prototype.build = function () {

		var element = document.createElement('section');
		element.className = 'WineShowMore';

		element.anchor = {};
		element.buttonTitle = {};
		element.button = {};
		element.icon = {};

		element.anchor.viewport = this.buildAnchor();

		element.buttonTitle.viewport = this.buildTitle();
		element.button.viewport = this.buildButton();
		element.icon.viewport = this.buildIcon();

		element.anchor.viewport.appendChild(element.buttonTitle.viewport);
		element.anchor.viewport.appendChild(element.button.viewport);
		element.anchor.viewport.appendChild(element.icon.viewport);

		element.appendChild(element.anchor.viewport);

		return element;

	};

	return WineShowMore;

})();