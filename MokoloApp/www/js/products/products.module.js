(function() {
	'use strict';

	angular
		.module('itinnovdesign.products', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.products', {
					url: '/businesses/:businessId/products',
					views: {
						'menuContent': {
							templateUrl: 'js/products/products.html',
							controller: 'ProductsController as vm'
						}
					}
				})
				.state('app.product', {
					url: '/businesses/:businessId/products/:productId',
					views: {
						'menuContent': {
							templateUrl: 'js/products/product.html',
							controller: 'ProductController as vm'
						}
					}
				});

		});

})();