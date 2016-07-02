(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.services')
		.controller('EditServiceDescriptionController', EditServiceDescriptionController);

	EditServiceDescriptionController.$inject = ['servicesService', '$stateParams', '$ionicHistory'];

	/* @ngInject */
	function EditServiceDescriptionController(servicesService, $stateParams, $ionicHistory) {
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
			servicesService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;
				vm.body = item.body;
			});
		}

		function save() {
			servicesService.saveItem(vm.item.$id, {
				body: vm.body
			});
			$ionicHistory.goBack();
		}

		function cancel() {
			$ionicHistory.goBack();
		}
	}
})();