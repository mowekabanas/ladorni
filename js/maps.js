/* Mowe Google Maps Controller */

var Maps = (function() {

	var center = {
		lat: -23.1223599,
		lng: -50.3821498
	};

	var styleArray = [
		{
			"featureType": "all",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"saturation": 36
				},
				{
					"color": "#000000"
				},
				{
					"lightness": 40
				}
			]
		},
		{
			"featureType": "all",
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#000000"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"featureType": "all",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 20
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 17
				},
				{
					"weight": 1.2
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 20
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 21
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 17
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 29
				},
				{
					"weight": 0.2
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 18
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 19
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 17
				}
			]
		},{
		"featureType": "poi",
		"stylers": [
			{
				"hue": "#ffab00"
			},
			{
				"saturation": -1.0989010989011234
			},
			{
				"gamma": 1
			}
		]
	}];

	/**
	 * The constructor of Mowe Maps
	 * @param viewport {object}
	 * @param apiScript {object}
	 * @param options {object}
	 * @param loadScriptFunction {function} optional
	 * @constructor Maps
	 */
	function Maps(viewport, apiScript, options, loadScriptFunction) {

		var self = this;

		this.viewport = viewport;
		this.apiScript = apiScript;
		this.options = options;

		this.apiScriptURL = 'https://maps.googleapis.com/maps/api/js';

		this.loadScriptFunction = loadScriptFunction;

		this.scriptLoadCtrl = function() {

			self.addDefaultOptions();

			if (self.loadScriptFunction)
				self.loadScriptFunction();
			else self.initMap();

		};

	}

	/**
	 * Init the map
	 */
	Maps.prototype.initMap = function() {

		this.options.zoomControlOptions = {
			position: google.maps.ControlPosition.RIGHT_CENTER
		};

		this.map = new google.maps.Map(this.viewport, this.options);

	};

	/**
	 * Add the default options to map
	 */
	Maps.prototype.addDefaultOptions = function () {

		this.options.center = this.options.center || center;
		this.options.zoom = 17;
		this.options.disableDefaultUI = true;
		this.options.zoomControl = true;
		this.options.styles = this.options.styles || styleArray;
		this.options.mapTypeId = google.maps.MapTypeId.ROADMAP;

	};

	/**
	 * Create element of script at DOM
	 */
	Maps.prototype.initAPIScript = function() {

		if (!this.apiScript) {

			this.apiScript = document.createElement('script');
			document.body.appendChild(this.apiScript);

		}

		if (!this.apiScript.src)
			this.apiScript.src = this.apiScriptURL;

		this.apiScript.addEventListener('load', this.scriptLoadCtrl, false);

	};

	Maps.prototype.init = function() {

		this.initAPIScript();

	};

	return Maps;

})();
