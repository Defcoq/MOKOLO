(function() {
	'use strict';

	angular
		.module('itinnovdesign.map', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.map', {
				url: '/map',
				views: {
					'menuContent': {
						templateUrl: 'js/map/map.html',
						controller: 'MapController as vm'
					}
				},
				resolve: {
					pins: function(mapService) {
						return mapService.getPins();
					},
					common: function(mapService) {
						return mapService.getCommon();
					}
				}
			});
		});
})();
