(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.businesses', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.businesses', {
					url: '/businesses',
					views: {
						'menuContent': {
							templateUrl: 'js/businesses/businesses.html',
							controller: 'BusinessesController as vm'
						}
					}
				})
				.state('app.business', {
					url: '/businesses/:id',
					views: {
						'menuContent': {
							templateUrl: 'js/businesses/business.html',
							controller: 'BusinessController as vm'
						}
					}
				})
				.state('app.edit-description', {
					url: '/businesses/:id/description',
					views: {
						'menuContent': {
							templateUrl: 'js/businesses/edit-description.html',
							controller: 'EditDescriptionController as vm'
						}
					}
				})
				.state('app.open-hours', {
					url: '/businesses/:id/open-hours',
					views: {
						'menuContent': {
							templateUrl: 'js/businesses/open-hours.html',
							controller: 'OpenHoursController as vm'
						}
					}
				});
		});
})();