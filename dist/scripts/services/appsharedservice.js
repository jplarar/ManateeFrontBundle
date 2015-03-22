'use strict';

/**
 * @ngdoc service
 * @name skillsmeisterApp.appSharedService
 * @description
 * # appSharedService
 * Service in the skillsmeisterApp.
 */
angular.module('skillsmeisterApp')
  .service('appSharedService', function($http, $q, authenticationSvc, $log) {
    //Helpers //Modify this section to call another server and to 
    // console.log(authenticationSvc.userInfo.apiKey);

    var serverURL = 'http://api.skillsmeister.com/';

    this.serverCall = function(apiURL, newData) {
    	var deferred = $q.defer();
		$http({
			method: 'POST',
			data: newData || {},
			dataType: 'json',
			url: serverURL + apiURL,
			headers: {
				'content-type': 'application/json',
				'x-authorization': authenticationSvc.userInfo.apiKey || ''
			}
		}).success(function(data) {
			deferred.resolve(data);
		}).error(function(data, status) {
			deferred.reject(data);
		});
	  	return deferred.promise;
    }

    this.removeUnnededProperties = function (object, propertiesToUpdate, objectId) {
		var newData = {};
		var howMany = typeof(propertiesToUpdate) === "undefined" ? 0 : propertiesToUpdate.length;
		if(howMany > 0) {
		propertiesToUpdate.forEach(function (n) {
			newData[n] = object[n];
		});
		newData[objectId] = object[objectId];
		} else {
			newData = object;
		}
		console.log(newData);
		return newData;
	}

	//User authentication
	this.userLogin = function (_username, _password) {
		var newData = {_username: _username, _password: _password}
		return this.serverCall('api/login', newData);
	}

    //User
    this.getUserListings = function (userId) {
	  var newData = (userId == 'undefined') ? {} : {userId: userId};
	  return this.serverCall('api/user/listings', newData);
	};
    this.getUser = function (userId) {
	  var newData = (userId == 'undefined') ? {} : {userId: userId};
	  return this.serverCall('api/user/view', newData);
	};
    this.newUser = function (user) {
	  return this.serverCall('api/user/new', user)
	};
    this.editUser = function (object, propertiesToUpdate) {
      var newData = this.removeUnnededProperties(object, propertiesToUpdate, 'userId'); 
      return this.serverCall('api/user/edit', newData);
	};
	
	//Categories
	this.categories = function () {
      return this.serverCall('api/category/list');
	};

	//Leaderboards
	this.leaderboardListings = function () {
      return this.serverCall('api/leaderboard/listings');
	};
	this.leaderboardUsers = function () {
      return this.serverCall('api/leaderboard/users');
	};

	//Search
	this.search = function (data) {
		var newData = (data == 'undefined') ? {} : data;
		return this.serverCall('api/listing/search', newData);
	}
	//Reviews
	this.getReviews = function () {
	  	return this.serverCall('api/review/list');
	};
	this.newReview = function (review) {
	  	return this.serverCall('api/review/new', review);
	};
	//PointLog
	this.newPointLog = function (pointLog) {
		return this.serverCall('api/pointlog/new', pointLog);
	};
    //Listings

	this.getListing = function (listingId) {
	  	return this.serverCall('api/listing/view',{ listingId: listingId });	
	};
    this.newListing = function (listing) {
	  return this.serverCall('api/listing/new', listing);
	};
    this.editListing = function (object, propertiesToUpdate) {
      var newData = this.removeUnnededProperties(object, propertiesToUpdate, 'listingId'); 
      return this.serverCall( 'api/api/listing/edit', newData );
	};

});
