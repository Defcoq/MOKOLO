(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.categories')
		.factory('categoriesService', categoriesService);

	categoriesService.$inject = ['fireDataService'];

	/* @ngInject */
	function categoriesService(fireDataService) {
		var categories = fireDataService.create('categories');
		return categories;
	}
})();
