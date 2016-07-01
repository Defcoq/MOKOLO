(function() {
	'use strict';

	angular
		.module('itinnovdesign.drupal', [
			'ionic',
			'itinnovdesign.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.drupal-articles', {
					url: '/drupal-articles',
					views: {
						'menuContent': {
							templateUrl: 'js/drupal/drupal-articles.html',
							controller: 'DrupalArticlesController as vm'
						}
					}
				})
				.state('app.drupal-article', {
					url: '/drupal-articles/:articleId',
					views: {
						'menuContent': {
							templateUrl: 'js/drupal/drupal-article.html',
							controller: 'DrupalArticleController as vm'
						}
					}
				});
		});
})();