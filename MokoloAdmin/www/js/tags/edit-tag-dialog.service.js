(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.tags')
		.factory('editTagDialogService', editTagDialogService);

	editTagDialogService.$inject = ['$rootScope', '$ionicModal', '$q'];

	/* @ngInject */
	function editTagDialogService($rootScope, $ionicModal, $q) {
		var scope = createModal();
		var service = {
			show: show
		};
		return service;

		// ***************************************************

		function show(name) {
			var defer = $q.defer();

			scope.data = {
				name: name
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

			$ionicModal.fromTemplateUrl('js/tags/edit-tag.html', {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
			});

			return scope;
		}
	}
})();
