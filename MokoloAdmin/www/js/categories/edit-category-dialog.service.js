(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.categories')
		.factory('editCategoryDialogService', editCategoryDialogService);

	editCategoryDialogService.$inject = ['$rootScope', '$ionicModal', '$q'];

	/* @ngInject */
	function editCategoryDialogService($rootScope, $ionicModal, $q) {
		var scope = createModal();
		var service = {
			show: show
		};
		return service;

		// ***************************************************

		function show(category) {
			category = category || {};
			var defer = $q.defer();

			scope.data = {
				name: category.name
			}

			scope.cancel = function() {
				scope.modal.hide();
				defer.reject();
			}
			scope.save = function() {
				if (scope.data.name) {
					scope.modal.hide();
					defer.resolve({
						name: scope.data.name
					});
				} else {
					alert('Name should be filled');
				}
			}

			scope.modal.show();
			return defer.promise;
		}

		function createModal() {
			var scope = $rootScope.$new();

			$ionicModal.fromTemplateUrl('js/categories/edit-category.html', {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
			});

			return scope;
		}
	}
})();
