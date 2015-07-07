(function(){

//load module
angular.module('trApp')
  .controller('ProfileController', ['$scope', '$http', 'ReviewService', ProfileController]);


  function ProfileController($scope, $http, ReviewService) {

    // Needed purely so ng-repeat works for carrot images
    $scope.numCarrots = function(number) {
      return new Array(number);
    };

    $http({
          method: 'GET',
          url: '/api/reviews'
        }).success(function(reviews){
          $scope.reviews = reviews;
        }).error(function(err){
          console.log(err);
        });

    return $http({
      method: 'GET',
      url: '/auth/profile/check',
    }).success(function(data, status, headers, config){
      $scope.user = data;
      $scope.user.memberSince = moment(Date($scope.user.memberSince)).format('MMMM Do YYYY');
    });

  }

})();