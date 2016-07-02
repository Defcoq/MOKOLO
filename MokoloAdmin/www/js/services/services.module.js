(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.services', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.services', {
					url: '/services',
					views: {
						'menuContent': {
							templateUrl: 'js/services/services.html',
							controller: 'servicesController as vm'
						}
					}
				})
				.state('app.service', {
					url: '/services/:id',
					views: {
						'menuContent': {
							templateUrl: 'js/services/service.html',
							controller: 'ServiceController as vm'
						}
					}
				})
				.state('app.edit-servicedescription', {
					url: '/services/:id/description',
					views: {
						'menuContent': {
							templateUrl: 'js/services/edit-description.html',
							controller: 'EditServiceDescriptionController as vm'
						}
					}
				});
		});
})();