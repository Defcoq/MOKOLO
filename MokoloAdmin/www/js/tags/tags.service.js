(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.tags')
		.factory('tagsService', tagsService);

	tagsService.$inject = ['fireDataService'];

	/* @ngInject */
	function tagsService(fireDataService) {
		var tags = fireDataService.create('tags');
		return tags;
	}
})();
