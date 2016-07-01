(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.infrastructure')
		.factory('firebaseDb', firebaseDb);

	firebaseDb.$inject = ['ENV'];

	/* @ngInject */
	function firebaseDb(ENV) {
		var db = new Firebase(ENV.firebaseUrl);
		return db;
	}
})();