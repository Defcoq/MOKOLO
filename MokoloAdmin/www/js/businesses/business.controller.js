(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.businesses')
		.controller('BusinessController', BusinessController);

	BusinessController.$inject = [
		'businessesService', '$stateParams', 'cameraService', 'amazonS3Service', '$ionicLoading', '$window', '$state', 'fieldEditor', 'listsService', '$ionicPopup', '_', 'ENV'];

	/* @ngInject */
	function BusinessController(
		businessesService, $stateParams, cameraService, amazonS3Service, $ionicLoading, $window, $state, fieldEditor, listsService, $ionicPopup, _, ENV) {
		var vm = angular.extend(this, {
			columnWidth: Math.ceil(100 / ENV.columnsInGallery),
			item: null,
			imageGroups: [],
			uploadImage: uploadImage,
			uploadImageWebView: uploadImageWebView,
			removeImage: removeImage,
			changeString: changeString,
			isWebView: !$window.Camera,
			chooseCategory: chooseCategory,
			chooseTags: chooseTags,
			changeDescription: changeDescription,
			showOpenHours: showOpenHours
		});

		(function activate() {
			loadItem();
		})();

		// ********************************************************************

		function showOpenHours() {
			$state.go('app.open-hours', { id: $stateParams.id });
		}

		function loadItem() {
			businessesService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;

				if (item.pictures) {
					vm.imageGroups = _.chunk(item.pictures, ENV.columnsInGallery);
				}
			});
		}

		function changeString(field) {
			fieldEditor.showTextFieldEditor({
				title: field[0].toUpperCase() + field.substring(1),
				value: vm.item[field]
			}).then(function(value) {
				vm.item[field] = value;
				var obj = {};
				obj[field] = value;
				businessesService.saveItem(vm.item.$id, obj);
			});
		}

		function chooseCategory() {
			listsService.getCategories().$loaded().then(function(categories) {
				fieldEditor.showSelector({
					items: categories,
					selectedItem: vm.item.category
				}).then(function(category) {
					vm.item.category = category;
					businessesService.saveItem(vm.item.$id, {
						category: category.$id
					});
				});
			});
		}

		function chooseTags() {
			listsService.getTags().$loaded().then(function(tags) {
				fieldEditor.showSelector({
					items: tags,
					selectedItems: vm.item.tags || [],
					multi: true
				}).then(function(tags) {
					vm.item.tags = tags;
					vm.item.tagsString = _.pluck(tags, 'name').join(', ')
					businessesService.saveItem(vm.item.$id, {
						tags: _.map(tags, '$id')
					});
				});
			});
		}

		function changeDescription() {
			$state.go('app.edit-description', {
				id: $stateParams.id
			});
		}

		function removeImage(item, isLogo) {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete the image',
				template: 'Are you sure you want to delete the image?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					if (!isLogo) {
						var index = vm.item.pictures.indexOf(item);
						vm.item.pictures.splice(index, 1);
						businessesService.saveItem(vm.item.$id, {
							pictures: vm.item.pictures
						});
					} else {
						businessesService.saveItem(vm.item.$id, {
							logo: null
						});
					}
					amazonS3Service.deleteImage(item);
					loadItem();
				}
			});
		}

		function uploadToS3(dataUri, isLogo) {
			$ionicLoading.show({});
			amazonS3Service.upload(dataUri)
				.then(function(url) {
					$ionicLoading.hide({});
					addImage(url, isLogo);
					loadItem();
				}, function(err) {
					$ionicLoading.hide({});
					console.log(err);
				});
		}

		function addImage(url, isLogo) {
			if (!isLogo) {
				if (!vm.item.pictures) {
					vm.item.pictures = [];
				}
				vm.item.pictures.push(url);
				businessesService.saveItem(vm.item.$id, {
					pictures: vm.item.pictures
				});
			} else {
				businessesService.saveItem(vm.item.$id, {
					logo: url
				});
			}
		}

		function uploadImageWebView($event, files, isLogo) {
			if (!files[0]) {
				return;
			}

			var reader = new FileReader();
			reader.onloadend = function(e) {
				var data = e.target.result;
				console.log('Loaded ' + typeof data);
				uploadToS3(data, isLogo);
				//send you binary data via $http or $resource or do anything else with it
			}
			reader.readAsDataURL(files[0]);
		}

		function uploadImage(isLogo) {
			cameraService.getPhoto().then(function(data) {
				uploadToS3(data, isLogo)
			});
		}
	}
})();
