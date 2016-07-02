(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.catalogs', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.catalogs', {
					url: '/catalogs',
					views: {
						'menuContent': {
							templateUrl: 'js/catalogs/catalogs.html',
							controller: 'catalogsController as vm'
						}
					}
				})
				.state('app.catalog', {
					url: '/catalogs/:id',
					views: {
						'menuContent': {
							templateUrl: 'js/catalogs/catalog.html',
							controller: 'CatalogController as vm'
						}
					}
				})
				.state('app.edit-catalogdescription', {
					url: '/catalogs/:id/description',
					views: {
						'menuContent': {
							templateUrl: 'js/catalogs/edit-description.html',
							controller: 'EditCatalogDescriptionController as vm'
						}
					}
				});
		});
})();