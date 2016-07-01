(function() {
	'use strict';

	angular
		.module('itinnovdesign.reviews', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.reviews', {
					url: '/businesses/:businessId/reviews',
					views: {
						'menuContent': {
							templateUrl: 'js/reviews/reviews.html',
							controller: 'ReviewsController as vm'
						}
					},
					resolve: {
						addReviewModal: function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('js/reviews/add-review.html', {
								scope: $rootScope,
								animation: 'slide-in-up'
							});
						}
					}
				});
		});

})();