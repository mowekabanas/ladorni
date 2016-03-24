
/* Logo SVG Request */

var Logo = (function () {

	/**
	 * SVG Logo request
	 * @param viewport {Element}
	 * @param url {string}
	 * @constructor
	 */
	function Logo(viewport, url) {

		var self = this;

		this.viewport = viewport;
		this.url = url;

		if (this.viewport && this.url) {

			var request = new XMLHttpRequest();
			request.open('GET', this.url, true);

			request.onreadystatechange = function() {

				if (this.readyState === 4)
					if (this.status >= 200)
						if (this.responseText)
							self.viewport.innerHTML = this.responseText;

			};

			request.send();
			request = null;

		}

	}

})();