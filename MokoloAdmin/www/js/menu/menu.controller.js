(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['authService'];

	/* @ngInject */
	function MenuController(authService) {
		angular.extend(this, {
			logout: logout
		});
		
		// *****************************************************

		function logout() {
			authService.signOut();
		}
	}
})();
