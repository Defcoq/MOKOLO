(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.generic', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.generic', {
					url: '/generic',
					views: {
						'menuContent': {
							templateUrl: 'js/generic/generic.html',
							controller: 'GenericController as vm'
						}
					}
				})
				.state('app.map-options', {
					url: '/generic/map-options',
					views: {
						'menuContent': {
							templateUrl: 'js/generic/map-options.html',
							controller: 'MapOptionsController as vm'
						}
					}
				});
		});
})();