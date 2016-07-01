(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = [
		'productsService', '$stateParams', 'cameraService', 'amazonS3Service', '$ionicLoading', '$window', '$state', 'fieldEditor', 'listsService', '$ionicPopup', '_', 'ENV'];

	/* @ngInject */
	function ProductController(
		productsService, $stateParams, cameraService, amazonS3Service, $ionicLoading, $window, $state, fieldEditor, listsService, $ionicPopup, _, ENV) {
		var vm = angular.extend(this, {
			columnWidth: Math.ceil(100 / ENV.columnsInGallery),
			item: null,
			imageGroups: [],
			uploadImage: uploadImage,
			uploadImageWebView: uploadImageWebView,
			removeImage: removeImage,
			changeString: changeString,
			isWebView: !$window.Camera,
			chooseBusiness: chooseBusiness,
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
			productsService.selectOne($stateParams.id).then(function(item) {
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
				productsService.saveItem(vm.item.$id, obj);
			});
		}

		function chooseBusiness() {
			listsService.getBusinesses().$loaded().then(function(businesses) {
				fieldEditor.showSelector({
					items: businesses,
					selectedItem: vm.item.business
				}).then(function(business) {
					vm.item.business = business;
					productsService.saveItem(vm.item.$id, {
						business: business.$id
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
					productsService.saveItem(vm.item.$id, {
						tags: _.map(tags, '$id')
					});
				});
			});
		}

		function changeDescription() {
			$state.go('app.edit-productdescription', {
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
						productsService.saveItem(vm.item.$id, {
							pictures: vm.item.pictures
						});
					} else {
						productsService.saveItem(vm.item.$id, {
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
				productsService.saveItem(vm.item.$id, {
					pictures: vm.item.pictures
				});
			} else {
				productsService.saveItem(vm.item.$id, {
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
