(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.businesses')
		.controller('OpenHoursController', OpenHoursController);

	OpenHoursController.$inject = ['businessesService', '$stateParams', 'fieldEditor', 'editOpenHoursService', '_', '$ionicListDelegate'];

	/* @ngInject */
	function OpenHoursController(businessesService, $stateParams, fieldEditor, editOpenHoursService, _, $ionicListDelegate) {
		var vm = angular.extend(this, {
			business: [],
			changeZone: changeZone,
			addItem: addItem,
			deleteItem: deleteItem,
			updateItem: updateItem
		});

		(function activate() {
			loadOpenHours();
		})();

		// ********************************************************************

		function deleteItem(day) {
			vm.business.openhours.days = _.filter(vm.business.openhours.days, function(item) {
				return item != day;
			});

			businessesService.saveItem(vm.business.$id, {
				openhours: vm.business.openhours
			});
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editOpenHoursService.show(item).then(function(result) {
				if (result.canceled) {
					return;
				}

				var day = _.find(vm.business.openhours.days, function(day) {
					return item == day;
				});

				day.day = result.day;
				day.openAt = result.openAt;
				day.closeAt = result.closeAt;
				businessesService.saveItem(vm.business.$id, {
					openhours: vm.business.openhours
				});
			});
		}

		function changeZone() {
			fieldEditor.showTextFieldEditor({
				title: 'Zone',
				value: vm.business.openhours.zone
			}).then(function(value) {
				vm.business.openhours.zone = value;
				businessesService.saveItem(vm.business.$id, {
					openhours: vm.business.openhours
				});
			});
		}

		function loadOpenHours() {
			businessesService.selectOne($stateParams.id).then(function(business) {
				vm.business = business;
				vm.business.openhours = vm.business.openhours || {};
			});
		}

		function addItem() {
			editOpenHoursService.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					day: result.day,
					openAt: result.openAt,
					closeAt: result.closeAt
				};

				vm.business.openhours.days = vm.business.openhours.days || [];
				vm.business.openhours.days.push(item);

				businessesService.saveItem(vm.business.$id, {
					openhours: vm.business.openhours
				});
			});
		}
	}
})();