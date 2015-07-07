(function(){

  //load module
  angular.module('trApp')
    .factory('ReviewService', ['$http', ReviewService]);

  function ReviewService($http){
    return {

      addReview: function(form) {
        return $http({
          method: 'POST',
          url: '/api/reviews',
          data: form
        }).success(function(review){
          return review;
        }).error(function(err){
          console.log(err);
        });
      },

      retrieveUserReviews: function(searchQuery) {
        // returns an array of review related to the user
        return $http({
          method: 'GET',
          url: '/api/reviews',
        }).success(function(reviews){
          return reviews;
        }).error(function(err){
          console.log(err);
        });
      }

    };
  }

})();
