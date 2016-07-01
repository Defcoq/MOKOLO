(function() {
	'use strict';

	angular
		.module('itinnovdesign.shop-delivery')
		.controller('HomeDeliveryController', HomeDeliveryController);

	HomeDeliveryController.$inject = [
		'shopCartService', 'shopOrderProcessor', 'shopInfoService', '$ionicHistory', '$state', 'deliveryDataService'];

	/* @ngInject */
	function HomeDeliveryController(shopCartService, shopOrderProcessor, shopInfoService, $ionicHistory, $state, deliveryDataService) {
		var shop;
		var vm = angular.extend(this, {
			submit: submit,
			form: deliveryDataService.getHomeDeliveryData() || {
				firstName: null,
				lastName: null,
				phoneNumber: null,
				zipCode: null,
				address: null
			}
		});

		(function activate() {
			loadshopInfo();
		})();

		// ********************************************************************

		function loadshopInfo() {
			shopInfoService.getshopInfo().then(function(data) {
				shop = data.shop;
			});
		}

		function submit(form) {
			angular.forEach(form, function(obj) {
				if(angular.isObject(obj) && angular.isDefined(obj.$setDirty)) { 
					obj.$setDirty();
				}
			})
			
			if (form.$valid) {
				performHomeDelivery();
			}
		}

		function performHomeDelivery() {
			var items = shopCartService.getAll();
			shopOrderProcessor.performHomeDelivery(items, vm.form, shop.email).then(function() {
				deliveryDataService.saveHomeDeliveryData(vm.form);
				shopCartService.flush();
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('app.home');
			}, function() {
				alert("Error when sending email");
			});
		}
	}
})();
