(function() {
	'use strict';

	angular
		.module('itinnovdesign.news', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.articles', {
					url: '/businesses/:businessId/articles',
					views: {
						'menuContent': {
							templateUrl: 'js/news/articles.html',
							controller: 'ArticlesController as vm'
						}
					}
				})
				.state('app.article', {
					url: '/businesses/:businessId/articles/:articleId',
					views: {
						'menuContent': {
							templateUrl: 'js/news/article.html',
							controller: 'ArticleController as vm'
						}
					}
				});
		});
})();