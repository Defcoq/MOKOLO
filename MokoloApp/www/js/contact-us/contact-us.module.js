(function() {
	'use strict';

	angular
		.module('itinnovdesign.contact-us', [
			'ionic',
			'ngCordova',
			'itinnovdesign.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.contact-us', {
					url: '/contact-us/:businessId',
					views: {
						'menuContent': {
							templateUrl: 'js/contact-us/contact-us.html',
							controller: 'ContactUsController as vm'
						}
					},
					resolve: {
						business: function($stateParams, businessesService) {
							return businessesService.getBusiness($stateParams.businessId);
						}
					}
				});
		});
})();
