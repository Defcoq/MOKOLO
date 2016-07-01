(function() {
	'use strict';

	angular
		.module('itinnovdesign.shop-delivery')
		.factory('shopInfoService', shopInfoService);

	shopInfoService.$inject = ['dataService'];

	/* @ngInject */
	function shopInfoService(dataService) {
		var service = {
			getshopInfo: getshopInfo
		};
		return service;

		// ************************************************************

		function getshopInfo() {
			return dataService.getBusiness().then(function(data) {
				var origin = data.officeLocation.split(',');
				origin = {
					lat: parseFloat(origin[0]),
					lon: parseFloat(origin[1])
				};
				var location = {
					origin: origin,
					zoom: 15,
					markers: [{
						lat: origin.lat,
						lon: origin.lon,
						name: data.storeName
					}]
				};
				var shop = {
					name: data.name,
			        //address: data.address,
					address: " rue manguier cameroun",
					email: data.email
				};
				return {
					location: location,
					shop: shop
				}
			});
		}
	}
})();
