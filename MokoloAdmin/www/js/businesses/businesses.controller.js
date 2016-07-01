(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.businesses')
		.controller('BusinessesController', BusinessesController);

	BusinessesController.$inject = ['businessesService', '$ionicListDelegate', 'editBusinessService', '$state'];

	/* @ngInject */
	function BusinessesController(businessesService, $ionicListDelegate, editBusinessService, $state) {
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
			$state.go('app.business', {
				id: item.$id
			});
		}

		function deleteItem(item) {
			businessesService.deleteItem(item);
			selectAll();
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editBusinessService.show(item.name, item.description).then(function(result) {
				if (result.canceled) {
					return;
				}

				businessesService.saveItem(item.$id, {
					name: result.name,
					description: result.description
				});
			});
		}

		function selectAll() {
			businessesService.selectAll().then(function(items) {
				vm.items = items;
			});
		}

		function addItem() {
			editBusinessService.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					name: result.name,
					description: result.description
				};

				businessesService.insert(item)
					.then(function() {
						selectAll();
					});
			});
		}
	}
})();