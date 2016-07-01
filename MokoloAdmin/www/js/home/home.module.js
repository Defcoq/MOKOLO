(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.home', [
			'ionic',
			'ngCordova',
			'itinnovdesign-frb-admin.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						'menuContent': {
							templateUrl: 'js/home/home.html',
							controller: 'HomeController as vm'
						}
					}
				});
		});
})();
