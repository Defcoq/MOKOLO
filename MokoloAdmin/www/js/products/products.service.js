(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.products')
		.factory('productsService', productsService);

	productsService.$inject = ['firebaseDb', '_', '$firebaseArray', '$firebaseObject', 'listsService'];

	/* @ngInject */
	function productsService(firebaseDb, _, $firebaseArray, $firebaseObject, listsService) {
		var collectionName = 'products';
		var query = firebaseDb.child(collectionName);
		var products = $firebaseArray(query);

		var service = {
			selectAll: selectAll,
			selectOne: selectOne,
			saveItem: saveItem,
			deleteItem: deleteItem,
			insert: insert
		};
		return service;

		function insert(item) {
			return products.$add(item);
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
				.then(enrichBusiness)
				.then(enrichTags);
		}

		function enrichBusiness(item) {
			if (!item.business) {
				return item;
			}
			return getBusiness(item.business).then(function(business) {
				return angular.extend({}, item, {
					business: business
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

		function getBusinesses() {
			return getCollection('businesses');
		}

		function getBusiness(id) {
			return getOne('businesses', id).$loaded();
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
				return getBusinesses().then(function(businesses) {
					return _.map(items, function(item) {
						var cat = item.business && _.find(businesses, '$id', item.business);
						return angular.extend(item, {
							businessName: cat ? cat.name : null
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
