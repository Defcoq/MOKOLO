(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.products', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.products', {
					url: '/products',
					views: {
						'menuContent': {
							templateUrl: 'js/products/products.html',
							controller: 'productsController as vm'
						}
					}
				})
				.state('app.product', {
					url: '/products/:id',
					views: {
						'menuContent': {
							templateUrl: 'js/products/product.html',
							controller: 'ProductController as vm'
						}
					}
				})
				.state('app.edit-productdescription', {
					url: '/products/:id/description',
					views: {
						'menuContent': {
							templateUrl: 'js/products/edit-description.html',
							controller: 'EditProductDescriptionController as vm'
						}
					}
				});
		});
})();