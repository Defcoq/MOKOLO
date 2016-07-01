(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.infrastructure')
		.factory('listsService', listsService);

	listsService.$inject = ['firebaseDb', '$firebaseArray'];

	/* @ngInject */
	function listsService(firebaseDb, $firebaseArray) {
		var businessesCollectionName = 'businesses';
		var categoriesCollectionName = 'categories';
		var tagsCollectionName = 'tags';

		return {
			getCategories: getCategories,
			getBusinesses : getBusinesses,
			getTags: getTags
		};

		function getTags() {
			return $firebaseArray(firebaseDb.child(tagsCollectionName));
		}

		function getCategories() {
			return $firebaseArray(firebaseDb.child(categoriesCollectionName));
		}
		
		function getBusinesses() {
			return $firebaseArray(firebaseDb.child(businessesCollectionName));
		}
	}
})();
