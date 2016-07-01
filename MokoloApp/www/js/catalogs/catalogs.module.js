(function() {
	'use strict';

	angular
		.module('itinnovdesign.catalogs', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.catalogs', {
					url: '/businesses/:businessId/catalogs',
					views: {
						'menuContent': {
							templateUrl: 'js/catalogs/catalogs.html',
							controller: 'CatalogsController as vm'
						}
					}
				})
				.state('app.catalog', {
					url: '/businesses/:businessId/catalogs/:catalogId',
					views: {
						'menuContent': {
							templateUrl: 'js/catalogs/catalog.html',
							controller: 'CatalogController as vm'
						}
					}
				});
		});
})();