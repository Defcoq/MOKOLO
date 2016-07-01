(function() {
	'use strict';

	angular
		.module('itinnovdesign.shop-cart')
		.factory('shopCartService', shopCartService);

	shopCartService.$inject = ['$rootScope', '$ionicPopup', '$state', '_', 'localStorageService'];

	/* @ngInject */
	function shopCartService($rootScope, $ionicPopup, $state, _, localStorageService) {
		var shopCartKey = 'shop-cart';
		var cart = localStorageService.get(shopCartKey) || [];

		var service = {
			addToCart: addToCart,
			showMyCart: showMyCart,
			deleteItem: deleteItem,
			changeQuantity: changeQuantity,
			flush: flush,
			getAll: getAll
		};
		return service;

		// ********************************************************

		function deleteItem(itemToRemove) {
			_.remove(cart, function(item) {
				return item === itemToRemove;
			});
			localStorageService.set(shopCartKey, cart);
		}

		function flush() {
			cart = [];
			localStorageService.set(shopCartKey, cart);
		}

		function showMyCart() {
			$state.go('app.shop-cart');
		}

		function getAll() {
			return cart;
		}

		function addToCart(cartItem) {
			if (cartItem.quantity) {
				saveToCart(cartItem, cartItem.quantity);
				return;
			}

			var popup = createAddToCartPopup(cartItem.name);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				saveToCart(cartItem, result.quantity);
			});
		}

		function saveToCart(cartItem, quantity) {
			cartItem.quantity = quantity;
			cart.push(cartItem);

			localStorageService.set(shopCartKey, cart);
		}

		function changeQuantity(cartItem) {
			var popup = createAddToCartPopup(cartItem.name, cartItem.quantity);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				cartItem.quantity = result.quantity;
				localStorageService.set(shopCartKey, cart);
			});
		}

		function createAddToCartPopup(title, quantity) {
			var scope = $rootScope.$new();
			scope.data = {
				quantity: quantity || 1
			};

			return {
				templateUrl: 'js/cart/add-to-cart.html',
				title: title,
				scope: scope,
				buttons: [{
					text: 'Cancel',
					onTap: function(e) {
						scope.data.canceled = true;
						return scope.data;
					}
				}, {
					text: '<b>Add to cart</b>',
					type: 'button-positive',
					onTap: function(e) {
						var quantity = parseInt(scope.data.quantity);
						if (quantity > 0) {
							scope.data.quantity = quantity;
							return scope.data;
						} else {
							alert('Quantity should be greather then zero');
							e.preventDefault();
						}
					}
				}]
			};
		}
	}
})();