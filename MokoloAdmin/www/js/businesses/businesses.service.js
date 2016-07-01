(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.businesses')
		.factory('businessesService', businessesService);

	businessesService.$inject = ['firebaseDb', '_', '$firebaseArray', '$firebaseObject', 'listsService'];

	/* @ngInject */
	function businessesService(firebaseDb, _, $firebaseArray, $firebaseObject, listsService) {
		var collectionName = 'businesses';
		var query = firebaseDb.child(collectionName);
		var businesses = $firebaseArray(query);

		var service = {
			selectAll: selectAll,
			selectOne: selectOne,
			saveItem: saveItem,
			deleteItem: deleteItem,
			insert: insert
		};
		return service;

		function insert(item) {
			return businesses.$add(item);
		}

		function deleteItem(item) {
			firebaseDb.child(collectionName).child(item.$id).remove();
		}

		function saveItem(id, source) {
			var one = firebaseDb.child(collectionName).child(id);
			return $firebaseObject(one).$loaded().then(function(item) {
				angular.extend(item, source);
				return item.$save();
			});
		}

		function selectOne(id) {
			var one = firebaseDb.child(collectionName).child(id);
			return $firebaseObject(one).$loaded()
				.then(enrichCategory)
				.then(enrichTags);
		}

		function enrichCategory(item) {
			if (!item.category) {
				return item;
			}
			return getCategory(item.category).then(function(category) {
				return angular.extend({}, item, {
					category: category
				});
			});
		}

		function enrichTags(item) {
			return getTags(item.tags).then(function(tags) {
				return angular.extend({}, item, {
					tags: tags,
					tagsString: _.pluck(tags, 'name').join(', ')
				});
			});
		}

		function getCategories() {
			return getCollection('categories');
		}

		function getCategory(id) {
			return getOne('categories', id).$loaded();
		}

		function getTags(keys) {
			return listsService.getTags().$loaded().then(function(tags) {
				return _.filter(tags, function(tag) {
					return !!_.find(keys, function(key) {
						return key === tag.$id;
					});
				});
			});
		}

		function selectAll() {
			return getCollection(collectionName).then(function(items) {
				return getCategories().then(function(categories) {
					return _.map(items, function(item) {
						var cat = item.category && _.find(categories, '$id', item.category);
						return angular.extend(item, {
							categoryName: cat ? cat.name : null
						});
					});
				});
			});
		}

		function getCollection(collection) {
			var query = firebaseDb.child(collection);
			return $firebaseArray(query).$loaded();
		}

		function getOne(collection, id) {
			var one = firebaseDb.child(collection).child(id);
			return $firebaseObject(one);
		}
	}
})();
