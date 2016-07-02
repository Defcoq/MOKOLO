(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.services')
		.controller('servicesController', servicesController);

	servicesController.$inject = ['servicesService', '$ionicListDelegate', 'editserviceservice', '$state'];

	/* @ngInject */
	function servicesController(servicesService, $ionicListDelegate, editserviceservice, $state) {
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
			$state.go('app.service', {
				id: item.$id
			});
		}

		function deleteItem(item) {
			servicesService.deleteItem(item);
			selectAll();
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editserviceservice.show(item.title, item.body).then(function(result) {
				if (result.canceled) {
					return;
				}

				servicesService.saveItem(item.$id, {
					title: result.title,
					body: result.body
				});
			});
		}

		function selectAll() {
			servicesService.selectAll().then(function(items) {
				vm.items = items;
			});
		}

		function addItem() {
			editserviceservice.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					title: result.title,
					body: result.body
				};

				servicesService.insert(item)
					.then(function() {
						selectAll();
					});
			});
		}
	}
})();