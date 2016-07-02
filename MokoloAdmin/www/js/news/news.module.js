(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.news', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.news', {
					url: '/news',
					views: {
						'menuContent': {
							templateUrl: 'js/news/news.html',
							controller: 'NewsController as vm'
						}
					}
				})
				.state('app.new', {
					url: '/news/:id',
					views: {
						'menuContent': {
							templateUrl: 'js/news/new.html',
							controller: 'NewController as vm'
						}
					}
				})
				.state('app.edit-newdescription', {
					url: '/news/:id/description',
					views: {
						'menuContent': {
							templateUrl: 'js/news/edit-description.html',
							controller: 'EditnewDescriptionController as vm'
						}
					}
				});
		});
})();