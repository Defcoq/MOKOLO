(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.tags')
		.controller('TagsController', TagsController);

	TagsController.$inject = ['tagsService', 'editTagDialogService', '$ionicListDelegate'];

	/* @ngInject */
	function TagsController(tagsService, editTagDialogService, $ionicListDelegate) {
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
			tagsService.deleteItem(item);
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editTagDialogService.show(item.name).then(function(result) {
				if (result.canceled) {
					return;
				}

				tagsService.updateItem(item, result);
			});
		}

		function selectAll() {
			vm.items = tagsService.selectAll();
		}

		function addItem() {
			editTagDialogService.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					name: result.name
				};

				tagsService.insert(item);
			});
		}
	}
})();