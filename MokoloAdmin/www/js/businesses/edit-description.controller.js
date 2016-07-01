(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.businesses')
		.controller('EditDescriptionController', EditDescriptionController);

	EditDescriptionController.$inject = ['businessesService', '$stateParams', '$ionicHistory'];

	/* @ngInject */
	function EditDescriptionController(businessesService, $stateParams, $ionicHistory) {
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
			businessesService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;
				vm.description = item.description;
			});
		}

		function save() {
			businessesService.saveItem(vm.item.$id, {
				description: vm.description
			});
			$ionicHistory.goBack();
		}

		function cancel() {
			$ionicHistory.goBack();
		}
	}
})();