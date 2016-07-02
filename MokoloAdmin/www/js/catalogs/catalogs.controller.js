(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.catalogs')
		.controller('catalogsController', catalogsController);

	catalogsController.$inject = ['catalogsService', '$ionicListDelegate', 'editcatalogservice', '$state'];

	/* @ngInject */
	function catalogsController(catalogsService, $ionicListDelegate, editcatalogservice, $state) {
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
			$state.go('app.catalog', {
				id: item.$id
			});
		}

		function deleteItem(item) {
			catalogsService.deleteItem(item);
			selectAll();
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editcatalogservice.show(item.title, item.body).then(function(result) {
				if (result.canceled) {
					return;
				}

				catalogsService.saveItem(item.$id, {
					title: result.title,
					body: result.body
				});
			});
		}

		function selectAll() {
			catalogsService.selectAll().then(function(items) {
				vm.items = items;
			});
		}

		function addItem() {
			editcatalogservice.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					title: result.title,
					body: result.body
				};

				catalogsService.insert(item)
					.then(function() {
						selectAll();
					});
			});
		}
	}
})();