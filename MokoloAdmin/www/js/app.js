angular.module('itinnovdesign-frb-admin', [
	'ionic',

	'ngCordova',

	'config',
	'itinnovdesign-frb-admin.infrastructure',
	'itinnovdesign-frb-admin.auth',
	'itinnovdesign-frb-admin.common',
	'itinnovdesign-frb-admin.home',
	'itinnovdesign-frb-admin.businesses',
	'itinnovdesign-frb-admin.products',
	'itinnovdesign-frb-admin.menu',
	'itinnovdesign-frb-admin.categories',
	'itinnovdesign-frb-admin.tags',
	'itinnovdesign-frb-admin.generic'
])
.value('_', window._)

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)

		if (window.cordova && window.cordova.plugins.Keyboard) {
			window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($urlRouterProvider, $compileProvider) {
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
	// if none of the above states are matched, use this as the fallback
});
