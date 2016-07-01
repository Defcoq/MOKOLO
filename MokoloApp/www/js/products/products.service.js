(function() {
	'use strict';

	angular
		.module('itinnovdesign.products')
		.factory('productsService', productsService);

	productsService.$inject = ['dataService'];

	/* @ngInject */
	function productsService(dataService) {
		var service = {
			getItems: getItems,
			getItem: getItem
		};
		return service;

		// *******************************************************

		function getItems(businessId){
		var products = dataService.getProducts(businessId);
		   console.log("elenco prodotti ricuperato da firebase");
		   console.log(products);
			return products;
		}

		function getItem(businessId, productId) {
			return dataService.getProduct(businessId, productId);
		}
	}
})();
