(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.categories', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.categories', {
					url: '/categories',
					views: {
						'menuContent': {
							templateUrl: 'js/categories/categories.html',
							controller: 'CategoriesController as vm'
						}
					}
				});
		});
})();