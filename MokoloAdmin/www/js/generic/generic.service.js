(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.generic')
		.factory('genericService', genericService);

	genericService.$inject = ['firebaseDb', '$firebaseObject'];

	/* @ngInject */
	function genericService(firebaseDb, $firebaseObject) {
		var service = {
			loadMapData: loadMapData,
			saveMapData: saveMapData
		}
		return service;

		// ********************************************

		function saveMapData(data) {
			return $firebaseObject(getMapDataQuery()).$loaded().then(function(item) {
				angular.extend(item, data);
				return item.$save();
			});
		}

		function loadMapData() {
			return $firebaseObject(getMapDataQuery()).$loaded().then(function(item) {
				return {
					origin: item.origin,
					zoomLevel: item.zoomLevel
				}
			});
		}

		function getMapDataQuery() {
			return firebaseDb.child('common').child('map');
		}
	}
})();
