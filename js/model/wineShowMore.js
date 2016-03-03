
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