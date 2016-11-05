/**
 * Created by nishantroy on 11/4/16.
 */
angular.module('myAppControllers', ['myAppServices'])


    .controller('DiagnosisController', function ($scope, $http) {
        // Diagnosis functionality
    })

    .controller('HomeController', function ($scope, $http) {

        $scope.concussioned = function () {
            swal({
                title: "Congretz! u hv conkushen",
                text: "u ded",
                type: "info"
            });
        }
    })

    .controller('WebgazerController', function ($scope, $http) {

        $scope.setup = function() {
            var width = 320;
            var height = 240;
            var topDist = '0px';
            var leftDist = '0px';

            var video = document.getElementById('webgazerVideoFeed');
            video.style.display = 'block';
            video.style.position = 'absolute';
            video.style.top = topDist;
            video.style.left = leftDist;
            video.width = width;
            video.height = height;
            video.style.margin = '0px';

            webgazer.params.imgWidth = width;
            webgazer.params.imgHeight = height;

            var overlay = document.getElementById('overlay');
            overlay.style.position = 'absolute';
            overlay.width = width;
            overlay.height = height;
            overlay.style.top = topDist;
            overlay.style.left = leftDist;
            overlay.style.margin = '0px';

            document.body.appendChild(overlay);

            var cl = webgazer.getTracker().clm;

            function drawLoop() {
                requestAnimFrame(drawLoop);
                overlay.getContext('2d').clearRect(0,0,width,height);
                if (cl.getCurrentPosition()) {
                    cl.draw(overlay);
                }
            }
            drawLoop();
        };

        $scope.checkReady = function () {
            if (webgazer.isReady()) {
                console.log("running setup");
                $scope.setup();
            } else {
                console.log("timeout");
                setTimeout($scope.checkReady, 100);
            }
        };

        $scope.startWebgaze = function () {
            console.log("Start");
            webgazer.begin()
                .setTracker("clmtrackr")
                .setRegression("ridge")
                .showPredictionPoints(true);
            $scope.checkReady();
        }
    })
;