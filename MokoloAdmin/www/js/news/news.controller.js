(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.news')
		.controller('NewsController', NewsController);

	NewsController.$inject = ['newsService', '$ionicListDelegate', 'editnewservice', '$state'];

	/* @ngInject */
	function NewsController(newsService, $ionicListDelegate, editnewservice, $state) {
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
			$state.go('app.new', {
				id: item.$id
			});
		}

		function deleteItem(item) {
			newsService.deleteItem(item);
			selectAll();
		}

		function updateItem(item) {
			$ionicListDelegate.closeOptionButtons();

			editnewservice.show(item.title, item.body).then(function(result) {
				if (result.canceled) {
					return;
				}

				newsService.saveItem(item.$id, {
					title: result.title,
					body: result.body
				});
			});
		}

		function selectAll() {
			newsService.selectAll().then(function(items) {
				vm.items = items;
			});
		}

		function addItem() {
			editnewservice.show().then(function(result) {
				if (result.canceled) {
					return;
				}

				var item = {
					title: result.title,
					body: result.body
				};

				newsService.insert(item)
					.then(function() {
						selectAll();
					});
			});
		}
	}
})();