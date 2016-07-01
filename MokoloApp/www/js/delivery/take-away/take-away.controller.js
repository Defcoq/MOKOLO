(function() {
	'use strict';

	angular
		.module('itinnovdesign.shop-delivery')
		.controller('TakeAwayController', TakeAwayController);

	TakeAwayController.$inject = [
		'shopCartService', 'shopOrderProcessor',
		'$rootScope', '$ionicPopup', 'shopInfoService', '$ionicHistory', '$state',
		'deliveryDataService', 'phoneNumber'];

	/* @ngInject */
	function TakeAwayController(
		shopCartService, shopOrderProcessor, $rootScope,
		$ionicPopup, shopInfoService, $ionicHistory, $state, deliveryDataService, phoneNumber) {
		var vm = angular.extend(this, {
			confirm: confirm,
			location: null,
			shop: null
		});

		(function activate() {
			loadshopInfo();
		})();

		// ********************************************************************

		function loadshopInfo() {
			shopInfoService.getshopInfo().then(function(data) {
				vm.location = data.location;
				vm.shop = data.shop;
			});
		}

		function confirm() {
			var popup = createConfirmationPopup();

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				var items = shopCartService.getAll();
				var deliveryData = {
					fullname: result.fullname,
					email: result.email,
					phone: result.phone
				};
				shopOrderProcessor.sendTakeAwayConfirmation(items, vm.shop, deliveryData)
					.then(function() {
						deliveryDataService.saveTakeAwayData(deliveryData);
						shopCartService.flush();
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$state.go('app.home');
					}, function() {
						alert("Error when sending email");
					});
			});
		}
		
		function createConfirmationPopup() {
			var scope = $rootScope.$new();
			scope.data = deliveryDataService.getTakeAwayData() || {
				email: null,
				fullname: null,
				phone: phoneNumber
			};

			return {
				templateUrl: 'js/delivery/take-away/delivery-confirmation.html',
				title: 'Confirmation dialog',
				subTitle: 'Email',
				scope: scope,
				buttons: [{
					text: 'Cancel',
					onTap: function(e) {
						scope.data.canceled = true;
						return scope.data;
					}
				}, {
					text: '<b>Confirm</b>',
					type: 'button-positive',
					onTap: function(e) {
						var email = scope.data.email;
						if (email && email.length > 3) {
							return scope.data;
						} else {
							alert('Enter correct email');
							e.preventDefault();
						}
					}
				}]
			};
		}
	}
})();
