(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.catalogs')
		.controller('EditCatalogDescriptionController', EditCatalogDescriptionController);

	EditCatalogDescriptionController.$inject = ['catalogsService', '$stateParams', '$ionicHistory'];

	/* @ngInject */
	function EditCatalogDescriptionController(catalogsService, $stateParams, $ionicHistory) {
		var vm = angular.extend(this, {
			item: null,
			body: '',
			save: save,
			cancel: cancel
		});

		(function activate() {
			loadItem();
		})();

		// ********************************************************************

		function loadItem() {
			catalogsService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;
				vm.body = item.body;
			});
		}

		function save() {
			catalogsService.saveItem(vm.item.$id, {
				body: vm.body
			});
			$ionicHistory.goBack();
		}

		function cancel() {
			$ionicHistory.goBack();
		}
	}
})();