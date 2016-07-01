(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.auth', [
			'ionic',
			'firebase'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'js/auth/login.html',
					controller: 'LoginController as vm',
					resolve: {
						signupModal: function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('js/auth/signup.html', {
								scope: $rootScope.$new()
							});
						}
					}
				})
		})
		.run(function($rootScope, $state, authService) {
			$rootScope.$on('loggedIn', function() {
				$state.go('app.home');
			});
			$rootScope.$on('loggedOut', function() {
				$state.go('login');
			});

			$rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
				if (!authService.user.isSignedIn) {
					if (next.name !== 'login') {
						event.preventDefault();
						$state.go('login');
					}
				} else {
					if (next.name === 'login') {
						event.preventDefault();
						$state.go('app.home');
					}
				}
			});

			if (authService.user.isSignedIn) {
				$state.go('app.home');
			} else {
				$state.go('login');
			}
		});
})();