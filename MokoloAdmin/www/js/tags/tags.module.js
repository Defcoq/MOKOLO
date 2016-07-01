(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.tags', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.tags', {
					url: '/tags',
					views: {
						'menuContent': {
							templateUrl: 'js/tags/tags.html',
							controller: 'TagsController as vm'
						}
					}
				});
		});
})();