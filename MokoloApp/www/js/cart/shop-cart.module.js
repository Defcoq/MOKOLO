(function() {
	'use strict';

	angular
		.module('itinnovdesign.shop-cart', [
			'ionic',
			'LocalStorageModule'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.shop-cart', {
					url: '/shop-cart',
					views: {
						'menuContent': {
							templateUrl: 'js/cart/shop-cart/shop-cart.html',
							controller: 'ShopCartController as vm'
						}
					}
				});
		});
})();