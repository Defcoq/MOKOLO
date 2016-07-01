(function() {
	'use strict';

	angular
		.module('itinnovdesign.common', ['ionic'])
		.value('geolib', window.geolib)
		.value('convert', window.convert);
})();