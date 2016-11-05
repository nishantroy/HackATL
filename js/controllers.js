/**
 * Created by nishantroy on 11/4/16.
 */
angular.module('myAppControllers', ['myAppServices'])


    .controller('DiagnosisController', function ($scope, $http) {
        // Diagnosis functionality
    })

    .controller('HomeController', function ($scope, $http) {

        $scope.concussioned = function() {
            swal({
                title: "Congretz! u hv conkushen",
                text: "u ded",
                type: "info"
            });
        }
    })
;