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

    .controller('WebgazerController', function ($scope, usSpinnerService, $rootScope) {

        $scope.countDown = function () {
            $scope.ExperimentInProgress = true;
            $scope.countdown = true;
            $scope.seconds = 50000; //ms? ns?
            $scope.startWebgaze();
            $scope.startSpin();
        };

        $scope.startcounter = 0;

        $scope.startSpin = function () {
            if (!$scope.spinneractive) {
                usSpinnerService.spin('spinner-1');
                $scope.startcounter++;
            }
        };

        $scope.stopSpin = function () {
            console.log("Stop spinner");
            if ($scope.spinneractive) {
                console.log("If Block");
                usSpinnerService.stop('spinner-1');
            }
        };
        $scope.spinneractive = false;
        $rootScope.$on('us-spinner:spin', function (event, key) {
            $scope.spinneractive = true;
        });

        $rootScope.$on('us-spinner:stop', function(event, key) {
            $scope.spinneractive = false;
        });

        $scope.setup = function () {
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
                overlay.getContext('2d').clearRect(0, 0, width, height);
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
                $scope.startSpin();
                console.log("Timer started");
                setTimeout($scope.finishDiagnosis, 5000);
            } else {
                console.log("timeout");
                setTimeout($scope.checkReady, 100);
            }
        };

        $scope.diagnose = function () {
            swal({title: "Diagnosis will begin",
                    text: "Follow the illuminated dot with your eyes, without moving your head"}
                , function () {
                    $scope.startWebgaze();
                })
        };

        $scope.finishDiagnosis = function () {
            webgazer.showPredictionPoints(false);
            webgazer.end();
            window.localStorage.clear();
            $scope.stopSpin();
            document.getElementById('overlay').remove();
            if (Math.random() > 0.5) {
                swal({
                    title: "No Concussion Detected",
                    text: "Athlete is safe for physical activity",
                    type: "success",
                    closeOnConfirm: true
                });
            } else {
                swal({
                    title: "Concussion suspected!",
                    text: "Athlete should not participate in physical activity until cleared by medical staff",
                    type: "error",
                    closeOnConfirm: true
                });
            }
        };

        $scope.startWebgaze = function () {
            console.log("Start");
            var averagex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var averagey = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var count = 0;
            webgazer
                .setGazeListener(function (prediction, elapsedTime) {
                    if (prediction) {
                        //console.log("X : " + prediction.x + ", Y : " + prediction.y);
                        averagex[count] = prediction.x;
                        averagey[count] = prediction.y;
                        count += 1;
                        if (count == averagex.length) {
                            var sumx = 0;
                            var sumy = 0;
                            for (var i = 0; i < averagex.length; i += 1) {
                                sumx += averagex[i];
                                sumy += averagey[i];
                                averagex[i] = 0;
                                averagey[i] = 0;
                            }
                            var avgX = sumx / averagex.length;
                            var avgY = sumy / averagey.length;
                            console.log("X : " + avgX + ", Y : " + avgY);
                            if (avgX > 1400 || avgX < 500 || avgY > 700 || avgY < 100) {
                                console.log("looked too far");
                            }
                            count = 0;
                        }
                    }


                })
                .begin()
                .setTracker("clmtrackr")
                .setRegression("ridge")
                .showPredictionPoints(true);

            $scope.checkReady();
        }
    })


    .controller('QuestionsController', function ($scope, $http) {
        //quiz thing
        $scope.startQuiz = function () {
            $scope.inProgress = true;
            $scope.quizOver = false;
            $scope.id = 0;
            $scope.score = 0;
            $scope.answers = [];
            $scope.chosenAnswer = "";
            $scope.questions = [
                {
                    question: "Was the athlete able to recall their location?",
                    options: ["Yes", "No"],
                    answer: 0
                },
                {
                    question: "Was the athlete able to recall the current date?",
                    options: ["Yes", "No"],
                    answer: 0
                },
                {
                    question: "Was the athlete able to recall the opposing team's name?",
                    options: ["Yes", "No"],
                    answer: 0
                },
                {
                    question: "Did the athlete correctly recall if their team scored this game?",
                    options: ["Yes", "No"],
                    answer: 0
                },
                {
                    question: "Is the athlete experiencing headaches, nausea, or dizziness?",
                    options: ["Yes", "No"],
                    answer: 1
                },
                {
                    question: "Have the athlete walk along a line, alternating their foot along the line on each step.\n" +
                    "Does the athlete step off the line or have any visible balance problems?",
                    options: ["Yes", "No"],
                    answer: 1
                },
                {
                    question: "Have the athlete sit comfortably on a chair and use his index finger to touch his nose five times, alternating hands.\n" +
                    "Does the athlete report any neck and spine pain, have trouble touching his nose, or fail to correctly touch his nose five times?",
                    options: ["Yes", "No"],
                    answer: 1
                },
                {
                    question: "Does the athlete have double vision or have trouble reading?",
                    options: ["Yes", "No"],
                    answer: 1
                }
            ];
            $scope.nextQuestion();
        };

        $scope.nextQuestion = function () {
            if ($scope.id < $scope.questions.length) {
                $scope.question = $scope.questions[$scope.id].question;
                $scope.options = $scope.questions[$scope.id].options;
                $scope.answer = $scope.questions[$scope.id].answer;
            } else {
                $scope.quizOver = true;
                $scope.calcResults();
            }

        };

        $scope.checkAnswer = function (ans) {
            console.log(ans);
            if (ans != $scope.options[$scope.answer]) {
                $scope.score++;
            }
            $scope.answers.push(ans);
            $scope.id++;
            $scope.nextQuestion();
        };

        $scope.calcResults = function () {
            console.log($scope.answers);
            if ($scope.score > 0) {

                if ($scope.score == 1) {
                    $scope.result = "The athlete has shown 1 symptom of concussion. " +
                        "They should refrain from activity.\n Take the test to diagnose severity.";
                } else {
                    $scope.result = "The athlete has shown " + $scope.score + " symptoms of concussion. " +
                        "They should refrain from activity.\n Take the test to diagnose severity.";
                }
            } else {
                $scope.result = "The athlete has not admitted to any symptoms of concussion. Take the test to verify.";
            }
        };
    })

;