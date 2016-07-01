(function() {
	'use strict';

	angular
		.module('itinnovdesign.wordpress', [
			'ionic',
			'itinnovdesign.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.wordpress-articles', {
					url: '/wordpress-articles',
					views: {
						'menuContent': {
							templateUrl: 'js/wordpress/wordpress-articles.html',
							controller: 'WordpressArticlesController as vm'
						}
					}
				})
				.state('app.wordpress-article', {
					url: '/wordpress-articles/:articleId',
					views: {
						'menuContent': {
							templateUrl: 'js/wordpress/wordpress-article.html',
							controller: 'WordpressArticleController as vm'
						}
					}
				});
		});
})();