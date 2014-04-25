'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', 'session',
  function($scope, Phone, session) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
    $scope.cartSize = session.getCartSize();
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone', 'session', '$cookieStore',
  function($scope, $routeParams, Phone, session, $cookieStore) {
    $scope.cart = $cookieStore.get('Cart');
    if($scope.cart != null) {
      $scope.cartSize = $scope.cart.length;
    }
    else{
      $scope.cartSize = 0;
    }
    
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });
  
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
    $scope.add = function(device) {
      session.addToCart(device);
      $scope.cartSize = session.getCartSize();
      console.log("size of cart is: " + $scope.cartSize);
    }
  }]);


phonecatControllers.controller('CartCtrl', ['$scope', '$cookieStore', 'session',
  function($scope, $cookieStore, session) {
    $scope.cart = $cookieStore.get('Cart');
    if($scope.cart != null) {
      $scope.cartSize = $scope.cart.length;
    }
    else{
      $scope.cartSize = 0;
    }

    $scope.remove = function(device) {
      if(session.removeFromCart(device) != 0) {alert("couldn't remove due to unknown error, try again later.")}
        else{
          $scope.cart = $cookieStore.get('Cart');
        }
    }
  }]);
