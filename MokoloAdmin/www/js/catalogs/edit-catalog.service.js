(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.catalogs')
		.factory('editcatalogservice', editcatalogservice);

	editcatalogservice.$inject = ['$rootScope', '$ionicModal', '$q'];

	/* @ngInject */
	function editcatalogservice($rootScope, $ionicModal, $q) {
		var scope = createModal();
		var service = {
			show: show
		};
		return service;
		
		// ***************************************************

		function show(title, body) {
			var defer = $q.defer();

			scope.data = {
				title: title,
				body: body
			}

			scope.cancel = function() {
				scope.modal.hide();
				defer.reject();
			}
			scope.save = function() {
				if (scope.data.title && scope.data.body) {
					scope.modal.hide();
					defer.resolve({
						title: scope.data.title,
						body: scope.data.body
					});
				} else {
					alert('title and body should be filled');
				}
			}

			scope.modal.show();
			return defer.promise;
		}

		function createModal() {
			var scope = $rootScope.$new();

			$ionicModal.fromTemplateUrl('js/catalogs/edit-catalog.html', {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
			});

			return scope;
		}
	}
})();
