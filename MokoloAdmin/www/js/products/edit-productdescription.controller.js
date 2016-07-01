(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.products')
		.controller('EditProductDescriptionController', EditProductDescriptionController);

	EditProductDescriptionController.$inject = ['productsService', '$stateParams', '$ionicHistory'];

	/* @ngInject */
	function EditProductDescriptionController(productsService, $stateParams, $ionicHistory) {
		var vm = angular.extend(this, {
			item: null,
			description: '',
			save: save,
			cancel: cancel
		});

		(function activate() {
			loadItem();
		})();

		// ********************************************************************

		function loadItem() {
			productsService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;
				vm.description = item.description;
			});
		}

		function save() {
			productsService.saveItem(vm.item.$id, {
				description: vm.description
			});
			$ionicHistory.goBack();
		}

		function cancel() {
			$ionicHistory.goBack();
		}
	}
})();