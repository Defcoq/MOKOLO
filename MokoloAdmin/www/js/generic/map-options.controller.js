(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.generic')
		.controller('MapOptionsController', MapOptionsController);

	MapOptionsController.$inject = ['genericService', '$ionicHistory'];

	/* @ngInject */
	function MapOptionsController(genericService, $ionicHistory) {
		var vm = angular.extend(this, {
			data: {
				zoomLevel: 0,
				origin: {
					longitude: null,
					latitude: null
				}
			},
			save: save
		});

		(function activate() {
			loadData();
		})();
		// ********************************************************************

		function save() {
			genericService.saveMapData(vm.data);
			$ionicHistory.goBack();
		}

		function loadData() {
			genericService.loadMapData()
				.then(function(data) {
					vm.data.zoomLevel = data.zoomLevel;
					vm.data.origin = data.origin;
				});
		}
	}
})();