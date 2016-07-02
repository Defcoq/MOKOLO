(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.news')
		.controller('EditNewDescriptionController', EditNewDescriptionController);

	EditNewDescriptionController.$inject = ['newsService', '$stateParams', '$ionicHistory'];

	/* @ngInject */
	function EditNewDescriptionController(newsService, $stateParams, $ionicHistory) {
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
			newsService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;
				vm.body = item.body;
			});
		}

		function save() {
			newsService.saveItem(vm.item.$id, {
				body: vm.body
			});
			$ionicHistory.goBack();
		}

		function cancel() {
			$ionicHistory.goBack();
		}
	}
})();