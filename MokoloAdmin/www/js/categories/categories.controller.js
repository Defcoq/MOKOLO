(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.categories')
		.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['categoriesService', 'editCategoryDialogService', '$ionicListDelegate'];

	/* @ngInject */
	function CategoriesController(categoriesService, editCategoryDialogService, $ionicListDelegate) {
		var vm = angular.extend(this, {
			items: [],
			addItem: addItem,
			deleteItem: deleteItem,
			updateItem: updateItem
		});

		(function activate() {
			selectAll();
		})();

		// ********************************************************************

		function deleteItem(item) {
			categoriesService.deleteItem(item);
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editCategoryDialogService.show(item).then(function(result) {
				if (result.canceled) {
					return;
				}

				categoriesService.updateItem(item, result);
			});
		}

		function selectAll() {
			vm.items = categoriesService.selectAll();
		}

		function addItem() {
			editCategoryDialogService.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					name: result.name
				};

				categoriesService.insert(item);
			});
		}
	}
})();