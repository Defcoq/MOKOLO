(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.businesses')
		.factory('editOpenHoursService', editOpenHoursService);

	editOpenHoursService.$inject = ['$rootScope', '$ionicModal', '$q'];

	/* @ngInject */
	function editOpenHoursService($rootScope, $ionicModal, $q) {
		var scope = createModal();
		var service = {
			show: show
		};
		return service;
		
		// ***************************************************

		function show(data) {
			data = data || {};
			var defer = $q.defer();

			scope.data = {
				day: data.day,
				openAt: data.openAt,
				closeAt: data.closeAt,
			}

			scope.cancel = function() {
				scope.modal.hide();
				defer.reject();
			}
			scope.save = function() {
				if (scope.data.day && scope.data.openAt && scope.data.closeAt) {
					scope.modal.hide();
					defer.resolve(scope.data);
				} else {
					alert('Fill all fields');
				}
			}

			scope.modal.show();
			return defer.promise;
		}

		function createModal() {
			var scope = $rootScope.$new();

			$ionicModal.fromTemplateUrl('js/businesses/edit-open-hours.html', {
				scope: scope
			}).then(function(modal) {
				scope.modal = modal;
			});

			return scope;
		}
	}
})();
