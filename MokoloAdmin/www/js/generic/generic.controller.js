(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.generic')
		.controller('GenericController', GenericController);

	GenericController.$inject = ['$state'];

	/* @ngInject */
	function GenericController($state) {
		var vm = angular.extend(this, {
			showMapOptions: showMapGenericOptions
		});

		// ********************************************************************

		function showMapGenericOptions() {
			$state.go('app.map-options');
		}
	}
})();