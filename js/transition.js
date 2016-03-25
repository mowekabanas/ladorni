
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