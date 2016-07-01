(function() {
	'use strict';

	angular
		.module('itinnovdesign.favorite-businesses', [
			'ionic',
			'ngCordova',
			'LocalStorageModule',
			'itinnovdesign.common',
			'ionic-toast'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.favorite-businesses', {
					url: '/favorite-businesses/:random',
					views: {
						'menuContent': {
							templateUrl: 'js/favorites/favorite-businesses.html',
							controller: 'FavoriteBusinessesController as vm'
						}
					}
				});
		});
})();
