(function() {
	'use strict';

	angular
		.module('itinnovdesign.common')
		.factory('openHoursService', openHoursService);

	openHoursService.$inject = ['_'];

	/* @ngInject */
	function openHoursService(_) {
		var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		var service = {
			isBusinessOpen: isBusinessOpen,
			getOpenHours: getOpenHours
		};
		return service;

		// *****************************************************************

		function getOpenHours(openHours) {
			var days = [];
			var groupedDays = _.groupBy(openHours.days, 'day');
			_.each(groupedDays, function(groupedDay) {
				var day = {
					times: []
				};

				_.each(groupedDay, function(d) {
					day.name = dayNames[d.day];
					var openAt = new Date(d.openAt);
					var closeAt = new Date(d.closeAt);

					var from = openAt.format('hh:MMtt');
					var to = closeAt.format('hh:MMtt');
					day.times.push(from + ' - ' + to);
				});

				days.push(day);
			});
			// debugger;
			return days;
		}

		function isBusinessOpen(openHours) {
			console.log("business open hours =>");
			console.log(openHours);
			var now = (new Date());
			var day = now.getDay();
			console.log(day);
			var hours = now.getHours();
			var minutes = now.getMinutes();

			var fixedTime = (new Date(2016, 0, 1, hours, minutes, 0)).getTime();
			console.log(fixedTime);

			var open;
			for (var i = 0; i < openHours.days.length; i++) {
				open = openHours.days[i];
				console.log(open.day);
				console.log(day);
				if (parseInt(open.day) !== parseInt(day)) {
					
					continue;
				}
				else
				{
					
					console.log("qui ho trovato almeno un date =>");
					console.log(open);
				}
                 console.log("data trovato =>");
				 console.log(open);
				 var openDaytimeAt = (new Date(2016, 0, 1, parseInt(open.openAt.substr(0, 2)), parseInt(open.openAt.substr(open.openAt.length-2, 2)), 0)).getTime();
				 var openDaytimeClosetAt = (new Date(2016, 0, 1, parseInt(open.closeAt.substr(0, 2)), parseInt(open.closeAt.substr(open.closeAt.length-2, 2)), 0)).getTime();
				 console.log(openDaytimeAt);
				 console.log(openDaytimeClosetAt);
				if (parseInt(fixedTime) >= parseInt(openDaytimeAt) && parseInt(fixedTime) <= parseInt(openDaytimeClosetAt)) {
					return true;
				}
			}
             console.log("siamo qui =>");
			return false;
		}
	}
})();
