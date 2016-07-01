(function() {
	'use strict';

	angular
		.module('itinnovdesign.services', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.services', {
					url: '/businesses/:businessId/services',
					views: {
						'menuContent': {
							templateUrl: 'js/services/services.html',
							controller: 'ServicesController as vm'
						}
					}
				})
				.state('app.service', {
					url: '/businesses/:businessId/services/:serviceId',
					views: {
						'menuContent': {
							templateUrl: 'js/services/service.html',
							controller: 'ServiceController as vm'
						}
					}
				});

		});

})();