
/* Load Bar */

var LoadBar = (function () {

	/**
	 * Load Bar constructor
	 * @param {Node} viewport
	 * @param {number} interval
	 * @param {Array} steps
	 * @param {number} progress
	 * @constructor
	 */
	function LoadBar(viewport, interval, progress, steps, maxprogress) {

		this.viewport = viewport;
		this.interval = interval || 500;
		this.progress = progress || 0;
		this.steps = steps || false;
		this.maxprogress = maxprogress || 100;

		this.progressBar = {};

		this.timer = false;

		if (this.viewport)
			this.init();

	}

	/**
	 * Build the steps Array
	 * The steps array is a time
	 * @param pass
	 * @return {Array}
	 */
	LoadBar.prototype.buildSteps = function (pass) {

		var steps = [];
		var eachStep = ( this.maxprogress - this.progress ) / pass;
		var lastStep = 0;

		for (var i = pass; i--; ) {

			if (!steps.length)
				lastStep = this.progress + eachStep;
			else
				lastStep = lastStep + eachStep;

			steps.push(lastStep);

		}

		return steps;

	};

	/**
	 * Change the progress bar (change the width of 'progress bar' element)
	 * @param progress
	 */
	LoadBar.prototype.changeProgress = function (progress) {

		if (this.progressBar.viewport)
			this.progressBar.viewport.style.width = progress + '%';

	};

	/**
	 * Stop de loadBar
	 * @param {Function} next
	 */
	LoadBar.prototype.stop = function (progress) {

		if (this.timer)
			clearTimeout(this.timer);

		if (progress)
			this.changeProgress(progress);

	};

	/**
	 * Start the loadBar
	 */
	LoadBar.prototype.start = function () {

		var self = this;

		var count = 0;

		this.timer = setInterval(function () {

			self.changeProgress(self.steps[count++]);

			if (self.steps.length <= count)
				self.stop();

		}, this.interval);

	};

	/**
	 * Get the ProgressBar element
	 * @return {boolean}
	 */
	LoadBar.prototype.getProgresBar = function () {

		this.progressBar.viewport = this.viewport.querySelector('.LoadBar-progress');

		return !!this.progressBar.viewport;

	};

	/**
	 * Check the elements, build the steps array and start!
	 */
	LoadBar.prototype.init = function () {

		if (this.viewport)
			if (this.getProgresBar())
				if (this.steps) {

					if (this.steps.constructor !== Array)
						this.steps = this.buildSteps(this.steps);

					this.start();

				}

	};

	return LoadBar;

})();