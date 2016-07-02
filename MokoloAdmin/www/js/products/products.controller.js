(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.products')
		.controller('productsController', productsController);

	productsController.$inject = ['productsService', '$ionicListDelegate', 'editProductService', '$state'];

	/* @ngInject */
	function productsController(productsService, $ionicListDelegate, editProductService, $state) {
		var vm = angular.extend(this, {
			items: [],
			addItem: addItem,
			deleteItem: deleteItem,
			updateItem: updateItem,
			openDetails: openDetails
		});

		(function activate() {
			selectAll();
		})();

		// ********************************************************************

		function openDetails(item) {
			$state.go('app.product', {
				id: item.$id
			});
		}

		function deleteItem(item) {
			productsService.deleteItem(item);
			selectAll();
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editProductService.show(item.name, item.description).then(function(result) {
				if (result.canceled) {
					return;
				}

				productsService.saveItem(item.$id, {
					name: result.name,
					description: result.description
				});
			});
		}

		function selectAll() {
			productsService.selectAll().then(function(items) {
				vm.items = items;
			});
		}

		function addItem() {
			editProductService.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					name: result.name,
					description: result.description
				};

				productsService.insert(item)
					.then(function() {
						selectAll();
					});
			});
		}
	}
})();