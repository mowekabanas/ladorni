
/* Wine Description */

var WineDescription = (function() {

	function WineDescription(viewport, autoInit) {

		this.viewport = viewport;

		if (autoInit)
			this.init();

	}

	WineDescription.prototype.getTextSize = function() {

		var paragraphs = this.viewport.querySelectorAll('p');

		var size = 0;

		for (var i = paragraphs.length; i--; )
			size += paragraphs[i].innerHTML.length;

		return size;

	};

	WineDescription.prototype.hasTextLimit = function() {

		return this.viewport.classList.contains('is-limited');

	};

	WineDescription.prototype.init = function() {

		console.log(this.hasTextLimit());

	};

	return WineDescription;

})();