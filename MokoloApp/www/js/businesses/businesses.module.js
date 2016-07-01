(function() {
	'use strict';

	angular
		.module('itinnovdesign.businesses', [
			'ionic',
			'ngCordova',
			'LocalStorageModule',
			'itinnovdesign.common',
			'ionic-toast'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.businesses', {
					url: '/businesses',
					views: {
						'menuContent': {
							templateUrl: 'js/businesses/businesses.html',
							controller: 'BusinessesController as vm',
							resolve: {
								filterModal: function($ionicModal, $rootScope) {
									return $ionicModal.fromTemplateUrl('js/businesses/filter.html', {
										scope: $rootScope,
										animation: 'slide-in-up'
									});
								}
							}
						}
					}
				})
				.state('app.business-details', {
					url: '/businesses/:businessId',
					views: {
						'menuContent': {
							templateUrl: 'js/businesses/business.html',
							controller: 'BusinessDetailsController as vm',
							resolve: {
								business: function($stateParams, businessesService) {
									return businessesService.getBusiness($stateParams.businessId);
								}
							}
						}
					}
				});
		});
})();
