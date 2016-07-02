(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.services')
		.controller('ServiceController', ServiceController);

	ServiceController.$inject = [
		'servicesService', '$stateParams', 'cameraService', 'amazonS3Service', '$ionicLoading', '$window', '$state', 'fieldEditor', 'listsService', '$ionicPopup', '_', 'ENV'];

	/* @ngInject */
	function ServiceController(
		servicesService, $stateParams, cameraService, amazonS3Service, $ionicLoading, $window, $state, fieldEditor, listsService, $ionicPopup, _, ENV) {
		var vm = angular.extend(this, {
			columnWidth: Math.ceil(100 / ENV.columnsInGallery),
			item: null,
			imageGroups: [],
			uploadImage: uploadImage,
			uploadImageWebView: uploadImageWebView,
			uploadPDFWebView:uploadPDFWebView,
			removeImage: removeImage,
			changeString: changeString,
			isWebView: !$window.Camera,
			chooseBusiness: chooseBusiness,
			chooseTags: chooseTags,
			changeDescription: changeDescription,
			showOpenHours: showOpenHours,
			pdfUrl: null
		});

		(function activate() {
			loadItem();
		})();

		// ********************************************************************

		function showOpenHours() {
			$state.go('app.open-hours', { id: $stateParams.id });
		}

		function loadItem() {
			servicesService.selectOne($stateParams.id).then(function(item) {
				vm.item = item;
				vm.pdfUrl = item.pdf;
				console.log(vm.pdfUrl);

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
				servicesService.saveItem(vm.item.$id, obj);
			});
		}

		function chooseBusiness() {
			listsService.getBusinesses().$loaded().then(function(businesses) {
				fieldEditor.showSelector({
					items: businesses,
					selectedItem: vm.item.business
				}).then(function(business) {
					vm.item.business = business;
					servicesService.saveItem(vm.item.$id, {
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
					servicesService.saveItem(vm.item.$id, {
						tags: _.map(tags, '$id')
					});
				});
			});
		}

		function changeDescription() {
			$state.go('app.edit-Sevicedescription', {
				id: $stateParams.id
			});
		}

		function removeImage(item, isLogo,itemName) {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete the image',
				template: 'Are you sure you want to delete the image?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					if (!isLogo) {
						var index = vm.item.pictures.indexOf(item);
						vm.item.pictures.splice(index, 1);
						servicesService.saveItem(vm.item.$id, {
							pictures: vm.item.pictures
						});
					} else {
						if(itemName=='pdf')
				  {
					 servicesService.saveItem(vm.item.$id, {
					pdf: null
				});
				  }
				  else
				  {
					   servicesService.saveItem(vm.item.$id, {
					thumb: null
				   });
				  }
					}
					amazonS3Service.deleteImage(item);
					loadItem();
				}
			});
		}

		function uploadToS3(dataUri, isLogo,itemName) {
			$ionicLoading.show({});
			amazonS3Service.upload(dataUri)
				.then(function(url) {
					$ionicLoading.hide({});
					addImage(url, isLogo,itemName);
					loadItem();
				}, function(err) {
					$ionicLoading.hide({});
					console.log(err);
				});
		}
		
			function uploadPDFToS3(dataUri, isLogo,itemName) {
			$ionicLoading.show({});
			amazonS3Service.uploadPDF(dataUri)
				.then(function(url) {
					$ionicLoading.hide({});
					addImage(url, isLogo,itemName);
					loadItem();
				}, function(err) {
					$ionicLoading.hide({});
					console.log(err);
				});
		}

		function addImage(url, isLogo, itemName) {
			if (!isLogo) {
				if (!vm.item.pictures) {
					vm.item.pictures = [];
				}
				vm.item.pictures.push(url);
				servicesService.saveItem(vm.item.$id, {
					pictures: vm.item.pictures
				});
			} else {
				  if(itemName=='pdf')
				  {
					 servicesService.saveItem(vm.item.$id, {
					pdf: url
				});
				  }
				  else
				  {
					   servicesService.saveItem(vm.item.$id, {
					thumb: url
				   });
				  }
				
			}
		}

		function uploadImageWebView($event, files, isLogo,itemName) {
			if (!files[0]) {
				return;
			}

			var reader = new FileReader();
			reader.onloadend = function(e) {
				var data = e.target.result;
				console.log('Loaded ' + typeof data);
				uploadToS3(data, isLogo,itemName);
				//send you binary data via $http or $resource or do anything else with it
			}
			reader.readAsDataURL(files[0]);
		}
		
			function uploadPDFWebView($event, files, isLogo,itemName) {
			if (!files[0]) {
				return;
			}
             uploadPDFToS3(files[0], isLogo,itemName);
			
		}

		function uploadImage(isLogo,itemName) {
			cameraService.getPhoto().then(function(data) {
				uploadToS3(data, isLogo,itemName)
			});
		}
	}
})();
