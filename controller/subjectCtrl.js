function subjectCtrl($scope, $http, $rootScope) {
    $rootScope.fullName;
    $scope.list_subject = [];
    $http.get('db/Subjects.js').then(function(response) {
        $scope.list_subject = response.data
    });
}