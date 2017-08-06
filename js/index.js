var myApp=angular.module("myApp",[]);

myApp.controller("myController",function($scope,$http){

$scope.orderByField = 'restaurant.name';
  $scope.reverseSort = false;

    $scope.getResturant=function(place){
		console.log(place);
    if(place==undefined){
      alert('Enter City name')
    }
    else{
      var params={area:place}
      $("#tablePreloader").show();
  		$http({
  		  "url":"https://restaurantlocater.herokuapp.com/searchResturant",
  		  "method":"POST",
  		  "params":params
  		}).then(function (response) {
  		  console.log(response.data)
        $("#tablePreloader").hide();
  			$scope.resturantList=response.data.nearby_restaurants;
  			$scope.city=response.data.location.city_name+","+response.data.location.country_name
  		})
    }

	}

  $scope.getRestaurantDetails=function(res_id) {
    console.log(res_id);
		var params={res_id:res_id}
    $("#modalPreloader").show();
		$http({
		  "url":"https://restaurantlocater.herokuapp.com/getRestaurantDetails",
		  "method":"POST",
		  "params":params
		}).then(function (response) {
		  console.log(response.data)
      $("#modalPreloader").hide();
      $scope.restaurant=response.data;
		})
  }
});
