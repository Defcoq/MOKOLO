(function() {
	'use strict';

	angular
		.module('itinnovdesign-frb-admin.auth')
		.factory('authService', authService);

	authService.$inject = ['$q', '$firebaseAuth', 'firebaseDb', '$rootScope'];

	/* @ngInject */
	function authService($q, $firebaseAuth, firebaseDb, $rootScope) {
		var auth = $firebaseAuth(firebaseDb);

		var service = {
			user: getStoredUser(),
			signIn: signIn,
			signUp: signUp,
			signOut: signOut,
			sessionExists: false
		};

		firebaseDb.onAuth(function(data) {
			if (!data) {
				setUser();
			} else {
				setUser(data.password);
				if (service.user.isSignedIn) {
					$rootScope.$emit('loggedIn');
				}
			}
		});

		return service;

		// *******************************************************************

		function signOut() {
			setUser();
			auth.$unauth();
			$rootScope.$emit('loggedOut');
		}

		function signUp(user) {
			return auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function(userData) {
				alert('User created successfully!');
				return userData;
			});
		}

		function signIn(email, password) {
			return auth.$authWithPassword({
				email: email,
				password: password
			}).then(function(authData) {
				console.log('Logged in as:' + authData.uid);

				setUser(authData.password);
				$rootScope.$emit('loggedIn');
				return authData;

			}, function(response) {
				console.log('Error', response);
			});
		}

		function setUser(user) {
			if (!user) {
				service.user.email = null;
				service.user.isSignedIn = false;
			} else {
				service.user.email = user.email;
				service.user.isSignedIn = true;
			}
			setStoredUser(service.user);
		}
		
		function getStoredUser() {
			var user = localStorage.getItem('authUser');
			if (user) {
				user = JSON.parse(user);
			}
			return user || { isSignedIn: false };
		}
		
		function setStoredUser(user) {
			if (user) {
				user = JSON.stringify(user);
			}
			localStorage.setItem('authUser', user);
		}
	}
})();