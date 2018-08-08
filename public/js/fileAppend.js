
/* File Append 1.1 */

var FileAppend = (function () {

	/**
	 * File Append request
	 * @param viewport {Element}
	 * @param url {string}
	 * @param fallback {object}
	 * @constructor
	 */
	function FileAppend(viewport, url, fallback) {

		var self = this;

		this.viewport = viewport || false;
		this.url = url;
		this.fallback = fallback;

		this.isLoaded = false;

		if (this.viewport || this.url)
			this.init();

	}

	/**
	 * Append to element
	 * @param toElement {Element}
	 * @param before {Element}
	 */
	FileAppend.prototype.appendTo = function (toElement, before) {

		if (!before)
			toElement.appendChild(this.viewport);
		else
			toElement.insertBefore(this.viewport, before);

	};

	/**
	 * Clone the logo and append to element
	 * @param toElement {Element}
	 */
	FileAppend.prototype.cloneTo = function (toElement) {

		toElement.appendChild(this.viewport.cloneNode(this.viewport));

	};

	FileAppend.prototype.get = function () {

		var self = this;

		if (this.viewport && this.url) {

			var request = new XMLHttpRequest();
			request.open('GET', this.url, true);

			request.onreadystatechange = function() {

				if (this.readyState === 4)
					if (this.status == 200)
						if (this.responseText) {

							// set 'isLoaded' state to true
							self.isLoaded = true;

							// auto append the content
							self.viewport.innerHTML = this.responseText;

							// call the fallback (if exists)
							if (self.fallback)
								self.fallback();

						}

			};

			request.send();
			request = null;

		}

	};

	FileAppend.prototype.init = function () {

		if (this.viewport)
			this.get();

	};

	return FileAppend;

})();
