
/* Page Load Actions */

var PageAction = (function () {

	/**
	 * Page Load Actions constructor
	 * @constructor
	 */
	function PageAction(navigation, page, stateClass) {

		var self = this;

		this.navigation = navigation || false;
		this.page = page || false;
		this.stateClass = stateClass || false;

	}

	PageAction.prototype.after = function () {

		// remove document state
		ladorni.navigation.removeDocumentState(this.stateClass);

	};

	PageAction.prototype.before = function (ev) {

		// put document state
		this.navigation.addDocumentState(this.stateClass);

		// if has file append
		if (this.page.fileAppend) {

			// if has not load, set it to be auto loaded when it is done
			if (this.page.load) {

				if (this.page.fileAppend.isLoaded)
					this.page.load();
				else
					this.page.autoLoad = true;

			}

		} else if (this.page.requireContent(true)) {

			this.page.load();

		}

	};

	return PageAction;

})();