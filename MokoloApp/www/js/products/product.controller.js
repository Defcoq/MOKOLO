(function() {
	'use strict';

	angular
		.module('itinnovdesign.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = ['$stateParams', 'productsService','ionicToast', 'shopCartService' ,'externalAppsService','$state','_'];

	/* @ngInject */
	function ProductController($stateParams, productsService,ionicToast,shopCartService, externalAppsService,$state,_) {
		var businessId = $stateParams.businessId;
		var productId = $stateParams.productId;
	
		var vm = angular.extend(this, {
			product: null,
			selectedPrice: null,
			buy: buy,
		  addToCart: addToCart,
		  showCart: showCart,
		   quickAddToCart: quickAddToCart,
		});


		(function activate() {
			loadProduct();
		})();
		// **********************************************

		function loadProduct() {
			productsService.getItem(businessId, productId)
				.then(function(product) {
					vm.product = product;
					vm.selectedPrice = product.price;
					console.log(product.pictures[0]);
				});
		}

		function buy() {
			externalAppsService.openExternalUrl(vm.product.url);
		}
		
			function quickAddToCart() {
			addToCart(1);
			ionicToast.show('\'' + vm.product.name +
				'\' has been added to the cart', 'bottom', false, 2000);
		}

		function showCart() {
			$state.go('app.shop-cart');
		}

		function addToCart(quantity) {
			shopCartService.addToCart({
				quantity: quantity,
				name: vm.product.name,
				price: vm.selectedPrice,
				//currency: vm.selectedPrice.currency,
				//size: vm.selectedPrice.name,
				picture: vm.product.pictures[0],
				description: vm.product.description,
				options: getSelectedOptions(vm.product.standardOptions).concat(getSelectedOptions(vm.product.extraOptions)),
			});
		}
		
		function getSelectedOptions(options) {
			var selectedOptions = _.filter(options, function(option) {
				return option.selected;
			});

			return _.map(selectedOptions, function(option) {
				return {
					name: option.name,
					value: option.value || 0
				};
			});
		}
	}
})();