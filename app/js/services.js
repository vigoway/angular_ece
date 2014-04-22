'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource', 'ngCookies']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);


/*
	This service sustains data and is used to sync user data across views
	Make sure to use $cookieStore, a session variable by itself won't hold data, i.e. data will be lost after you refresh the page
	This solution only works for small amounts of data (about 4K)
	Anything bigger than 4K, consider the localStorage option(HTML 5):
	 	http://www.w3schools.com/html/html5_webstorage.asp 
	Docs for $cookieStore: 
		https://docs.angularjs.org/api/ngCookies/service/$cookieStore
*/

phonecatServices.factory('session', function ($cookieStore) {
        var Cart = [];
        if ($cookieStore.get('Cart') != '') { Cart = $cookieStore.get('Cart');}
        return {
            getCart: function () {
                return Cart;
            },
            setCart: function(cart) {
            	Cart = cart;
            },
            addToCart: function(item) {
            	Cart.push({'id': item.id, 'name': item.name});
            	$cookieStore.put('Cart', Cart);
            },
            removeFromCart: function(item) {
            	//console.log("looking for: " + item.id + " in Cart with length: " + Cart.length);
            	for (var i = 0; i < Cart.length; i++)
			   	{
			   		//console.log(i + " " + Cart[i].id);
			   		if (Cart[i].id === item.id) {
			      		Cart.splice(i,1);
			      		$cookieStore.put('Cart', Cart);
			      		return 0;
			   		}
			   	}
			   	return 1;
            },
            getCartSize: function(){
            	return Cart.length;
            }
        };
 });