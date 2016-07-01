(function() {
	'use strict';

	angular
		.module('itinnovdesign.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope', '$state', 'productsService'];

	/* @ngInject */
	function ProductsController($scope, $state, productsService) {
		var businessId = $state.params.businessId;

		var vm = angular.extend(this, {
			products: [],
			showProductDetails: showProductDetails
		});

		(function() {
			loadProducts();
		})();
		// ******************************************************

		function loadProducts() {
			productsService.getItems(businessId).then(function(data) {
				console.log("numero prodotti caricatti =>");
				console.log(data.length);
				vm.products = data;
			});
		}

		function showProductDetails(productId) {
			$state.go('app.product', {
				businessId: businessId,
				productId: productId
			});
		}
	}
})();