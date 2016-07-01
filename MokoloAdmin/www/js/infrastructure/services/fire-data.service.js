(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.infrastructure')
		.factory('fireDataService', fireDataService);

	fireDataService.$inject = ['$firebaseArray', 'firebaseDb', '$firebaseObject'];

	/* @ngInject */
	function fireDataService($firebaseArray, firebaseDb, $firebaseObject) {
		return {
			create: create
		};

		function create(collectionName) {
			var collection = $firebaseArray(firebaseDb.child(collectionName));

			var service = {
				selectAll: selectAll,
				selectOne: selectOne,
				insert: insert,
				deleteItem: deleteItem,
				updateItem: updateItem
			};
			return service;

			function deleteItem(item) {
				return collection.$remove(item).then(function(ref) {
					return ref.key() === item.$id;
				});
			}

			function updateItem(oldItem, updatedItem) {
				var one = firebaseDb.child(collectionName).child(oldItem.$id);
				return $firebaseObject(one).$loaded().then(function(item) {
					angular.extend(item, updatedItem);
					return item.$save();
				});
			}

			function selectAll() {
				return collection;
			}

			function selectOne(id) {
				var one = firebaseDb.child(collectionName).child(id);
				return $firebaseObject(one);
			}

			function insert(item) {
				return collection.$add(item);
			}
		}
	}
})();
