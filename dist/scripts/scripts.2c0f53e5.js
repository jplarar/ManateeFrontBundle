"use strict";angular.module("skillsmeisterApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","googlechart","picardy.fontawesome","ui.bootstrap","angular-lodash","oitozero.ngSweetAlert"]).run(["$log","SweetAlert","$rootScope","$timeout","$location","authenticationSvc","appSharedService","$window",function(a,b,c,d,e,f,g,h){f.init();var i=f.getUserInfo();if("undefined"!=i&&!$.isEmptyObject(i)){var j=g.categories();j.then(function(a){var a=a.response;0!=a.error&&b.swal("Error",a.description,"warning"),c.categories=a.data})}c.logout=function(){var a=f.logout();a.then(function(a){var a=a.response;0===a.error&&(h.sessionStorage.userInfo=null,c.isLoggedIn=!1,e.path("/login"))})},c.$on("$routeChangeSuccess",function(){$("li,div,a").removeClass("active"),d(function(){$('a[ng-href="#'+e.$$path+'"]').addClass("active").parent().addClass("active")},200)}),c.$on("$routeChangeError",function(a,b,c,d){d.authenticated===!1&&e.path("/login")})}]).config(["$routeProvider","$httpProvider",function(a,b){b.interceptors.push("responseObserver");var c=function(a,b,c,d){var e=b.getUserInfo();return d.userInfo=e,c.info(e),"undefined"==e||$.isEmptyObject(e)?(d.isLoggedIn=!1,a.reject({authenticated:!1})):(d.isLoggedIn=!0,a.when(e))};a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/profile",{templateUrl:"views/profile.html",controller:"ProfileCtrl",resolve:c}).when("/leaderboard",{templateUrl:"views/leaderboard.html",controller:"LeaderboardCtrl",resolve:c}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/leaderboard",{templateUrl:"views/leaderboard.html",controller:"LeaderboardCtrl",resolve:c}).when("/browse",{templateUrl:"views/browse.html",controller:"BrowseCtrl",resolve:c}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl"}).when("/getintouch",{templateUrl:"views/getintouch.html",controller:"GetintouchCtrl"}).when("/course/:id",{templateUrl:"views/course.html",controller:"CourseCtrl",resolve:c}).otherwise({redirectTo:"/"})}]),angular.module("skillsmeisterApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("skillsmeisterApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("skillsmeisterApp").service("appSharedService",["$http","$q","authenticationSvc","$log",function(a,b,c){var d="http://api.skillsmeister.com/";this.serverCall=function(e,f){var g=b.defer();return a({method:"POST",data:f||{},dataType:"json",url:d+e,headers:{"content-type":"application/json","x-authorization":c.userInfo.apiKey||""}}).success(function(a){g.resolve(a)}).error(function(a){g.reject(a)}),g.promise},this.removeUnnededProperties=function(a,b,c){var d={},e="undefined"==typeof b?0:b.length;return e>0?(b.forEach(function(b){d[b]=a[b]}),d[c]=a[c]):d=a,console.log(d),d},this.userLogin=function(a,b){var c={_username:a,_password:b};return this.serverCall("api/login",c)},this.getUserListings=function(a){var b="undefined"==a?{}:{userId:a};return this.serverCall("api/user/listings",b)},this.getUser=function(a){var b="undefined"==a?{}:{userId:a};return this.serverCall("api/user/view",b)},this.newUser=function(a){return this.serverCall("api/user/new",a)},this.editUser=function(a,b){var c=this.removeUnnededProperties(a,b,"userId");return this.serverCall("api/user/edit",c)},this.categories=function(){return this.serverCall("api/category/list")},this.leaderboardListings=function(){return this.serverCall("api/leaderboard/listings")},this.leaderboardUsers=function(){return this.serverCall("api/leaderboard/users")},this.search=function(a){var b="undefined"==a?{}:a;return this.serverCall("api/listing/search",b)},this.getReviews=function(){return this.serverCall("api/review/list")},this.newReview=function(a){return this.serverCall("api/review/new",a)},this.newPointLog=function(a){return this.serverCall("api/pointlog/new",a)},this.getListing=function(a){return this.serverCall("api/listing/view",{listingId:a})},this.newListing=function(a){return this.serverCall("api/listing/new",a)},this.editListing=function(a,b){var c=this.removeUnnededProperties(a,b,"listingId");return this.serverCall("api/api/listing/edit",c)}}]),angular.module("skillsmeisterApp").controller("ProfileCtrl",["$scope","$log","$modal","SweetAlert","$location","$window","appSharedService","$rootScope",function(a,b,c,d,e,f,g,h){a.user={},a.user.courses=[];var i=g.getUser();i.then(function(c){var c=c.response;return 0!==c.error?void d.swal("Hubo un error",c.description,"error"):(b.info(c.data[0]),a.user=c.data[0],void a.getCourses())}),a.getRandomSpan=function(){return Math.floor(3*Math.random())},a.colors=["red","yellow","blue"],a.getCourses=function(){var c=g.getUserListings();c.then(function(c){var c=c.response;return 0!==c.error?void d.swal("Hubo un error",c.description,"error"):(b.info(c),console.log(c.data.length),void(0==c.data.length?a.noCourses=!0:(_.each(c.data,function(b){b.color=a.colors[a.getRandomSpan()]}),a.user.courses=c.data)))})},a.editCourse=function(e,f){var i=c.open({templateUrl:"views/editmodal.html",controller:"EditmodalCtrl",size:e,resolve:{item:function(){return a.user.courses[f]}},backdrop:"static",keyboard:!1});i.result.then(function(c){if(h.isLoading=!0,b.info(c),"undefined"==typeof c.listingId){b.info("is undefined");var e=g.newListing(c),f=!0}else var e=g.editListing(c);e.then(function(b){var b=b.response;return 0!==b.error?void d.swal("Hubo un error",b.description,"error"):(f&&(b.data[0].color=a.colors[a.getRandomSpan()],a.user.courses.push(b.data[0]),a.noCourses=!1),d.swal("Success!","Muy bien tu cursos ha sido publicado","success"),void(h.isLoading=!1))})},function(b){if(b){var c=_.findKey(a.user.courses,{listingId:b.listingId});a.user.courses[c]=b}})}}]),angular.module("skillsmeisterApp").controller("LeaderboardCtrl",["$scope","SweetAlert","$log","$rootScope","$window","appSharedService","$timeout",function(a,b,c,d,e,f,g){a.listings=function(){var e=f.leaderboardListings();e.then(function(e){var e=e.response;return 0!=e.error?void b.swal("Lo sentimos",e.description,"error"):(c.info(e.data),_.each(e.data,function(a){c.info(_.result(_.findWhere(d.categories,{categoryId:a.categoryId}),"imageUrl")),a.categoryImage=_.result(_.findWhere(d.categories,{categoryId:a.categoryId}),"imageUrl")}),void(a.courses=e.data))})},a.topUsers=function(){var c=f.leaderboardUsers();c.then(function(c){var c=c.response;return 0!=c.error?void b.swal("Lo sentimos",c.description,"error"):void(a.users=c.data)})},angular.element(document).ready(function(){g(function(){a.listings(),a.topUsers()},300)})}]),angular.module("skillsmeisterApp").filter("percentage",["$filter",function(a){return function(b,c){return a("number")(100*b,c)+"%"}}]),angular.module("skillsmeisterApp").directive("scroll",["$window",function(a){return function(b){angular.element(a).bind("scroll",function(){b.boolChangeClass=this.pageYOffset>=117?!0:!1,b.$apply()})}}]),angular.module("skillsmeisterApp").controller("LoginCtrl",["$scope","$log","SweetAlert","appSharedService","$rootScope","authenticationSvc","$window","$location",function(a,b,c,d,e,f,g,h){a.login=function(){e.isLoading=!0;var d=f.login(a.user.email,a.user.password);d.then(function(d){b.info(d);var d=d.response;if(0!==d.error)return e.isLoading=!1,void c.swal("Error "+d.error,d.description,"error");var i={username:a.user.email,apiKey:d.data[0].apiKey};f.setUserInfo(i),e.userInfo=i,g.sessionStorage.userInfo=JSON.stringify(i),e.isLoggedIn=!0,h.path("/leaderboard"),e.isLoading=!1})}}]),angular.module("skillsmeisterApp").controller("BrowseCtrl",["$scope","SweetAlert","$log","$rootScope","appSharedService","$timeout",function(a,b,c,d,e,f){a.data={q:""},a.search=function(){var f=e.search(a.data);f.then(function(e){var e=e.response;return 0!==e.error?void b.swal("Hubo un error",e.description,"error"):(c.info(e),_.each(e.data,function(a){c.info(_.result(_.findWhere(d.categories,{categoryId:a.categoryId}),"imageUrl")),a.categoryImage=_.result(_.findWhere(d.categories,{categoryId:a.categoryId}),"imageUrl")}),void(a.courses=e.data))})},angular.element(document).ready(function(){f(function(){a.search()},300)})}]),angular.module("skillsmeisterApp").controller("SignupCtrl",["$scope","$log","SweetAlert","appSharedService","$rootScope","authenticationSvc","$window","$location",function(a,b,c,d,e,f,g,h){a.registerUser=function(){a.user.country="México",e.isLoading=!0;var b=d.newUser(a.user);b.then(function(b){var b=b.response;0!==b.error?c.swal("Error","Could not load data","error"):a.login()})},a.login=function(){var d=f.login(a.user.email,a.user.password);d.then(function(d){b.info(d);var d=d.response;if(0!==d.error)return void c.swal("Error "+d.error,d.description,"error");var i={username:a.user.email,apiKey:d.data[0].apiKey};f.setUserInfo(i),e.userInfo=i,g.sessionStorage.userInfo=JSON.stringify(i),e.isLoggedIn=!0,h.path("/leaderboard"),e.isLoading=!1})}}]),angular.module("skillsmeisterApp").controller("EditmodalCtrl",["$scope","$modalInstance","$log","item","$timeout",function(a,b,c,d,e){var f=angular.extend({},d);e(function(){$("form:not(.filter) :input:visible:enabled:first").focus()},300),a.selectedIndex=0,a.item="undefined"==typeof d?{}:d,a.item.status="undefined"==typeof d?"P":d.status,a.newItem="undefined"==typeof d?!0:!1,a.save=function(){b.close(a.item)},a.cancel=function(){a.newItem?b.dismiss():b.dismiss(f)}}]),angular.module("skillsmeisterApp").controller("GetintouchCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("skillsmeisterApp").factory("responseObserver",["$q","$window","$location","SweetAlert","$log","$rootScope",function(a,b,c,d,e,f){return{request:function(a){return a},requestError:function(b){return a.reject(b)},response:function(a){return a},responseError:function(b){switch(e.info("responseError"),b.status){case 0:d.swal("Error","Ocurrió un error, favor de contactar al administrador.","error"),e.info(b),f.isLoading=!1;break;case 301:d.swal("Error 301","Moved permanently.","error");break;case 401:d.swal("Error 401","A simple error.","error");break;case 403:d.swal("Error","You're not Authorized, please authenticate.","error"),c.path("/login"),f.isLoading=!1;break;case 404:d.swal("Error","Not found.","error");break;case 500:d.swal("Error","That page does not exist","error")}return a.reject(b)}}}]),angular.module("skillsmeisterApp").factory("authenticationSvc",["$http","$q","$window","$log","SweetAlert","$location","$rootScope",function(a,b,c,d,e,f,g){var h="http://api.skillsmeister.com/",i={};return i.userInfo={},i.setUserInfo=function(a){return i.userInfo=a,i.userInfo},i.getUserInfo=function(){return i.userInfo},i.serverCall=function(d,e){i.userInfo=angular.fromJson(c.sessionStorage.userInfo);var f="null"==i.userInfo||null==i.userInfo?"":i.userInfo.apiKey,g=e||{},j=b.defer();return a({method:"POST",data:g,dataType:"json",withCredentials:!1,url:h+d,headers:{"content-type":"application/json","x-authorization":f}}).success(function(a){j.resolve(a)}).error(function(a){j.reject(a)}),j.promise},i.login=function(a,b){return i.serverCall("api/login",{_username:a,_password:b})},i.logout=function(){return i.serverCall("api/logout")},i.init=function(){if(c.sessionStorage.userInfo&&"null"!==c.sessionStorage.userInfo&&null!==c.sessionStorage.userInfo){g.isLoading=!0;var a=i.serverCall("api/validate");a.then(function(a){var b=a.response;0==b.error?(g.userInfo=angular.fromJson(c.sessionStorage.userInfo),g.isLoggedIn=!0,"/login"==f.path()?f.path("/leaderboard"):"",g.isLoading=!1):(e.swal("Wait a sec.","Tu sesión expiró favor de iniciar sesión otra vez","error"),g.isLoading=!1)})}},i.init(),i}]),angular.module("skillsmeisterApp").controller("CourseCtrl",["$scope","$rootScope","$log","SweetAlert","$routeParams","appSharedService","$timeout",function(a,b,c,d,e,f,g){c.info(e.id);var h=f.getListing(e.id);h.then(function(e){var e=e.response;return 0!==e.error?void d.swal("Hubo un error",e.description,"error"):void g(function(){e.data[0].categoryImage=_.result(_.findWhere(b.categories,{categoryId:e.data[0].category}),"imageUrl"),c.info(e.data[0]),a.course=e.data[0]},300)}),a.reviews=[{comment:"La verdad me encanto el curso, fue lo mejor poderlo llevar y Luis, mis respetos, papiloid.",rating:5,user:"Luis Villarreal"},{comment:"La verdad me encanto el curso, fue lo mejor poderlo llevar y Luis, mis respetos, papiloid.",rating:5,user:"Luis Villarreal"}],a.rate=2,a.max=5,a.isReadonly=!1,a.hoveringOver=function(b){a.overStar=b,a.percent=100*(b/a.max)}}]);