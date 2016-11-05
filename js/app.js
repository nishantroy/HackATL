/**
 * Created by nishantroy on 11/4/16.
 */
angular.module('myApp', ['ui.router', 'myAppControllers', 'angularSpinner'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                name: 'Home Page',
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            })

            .state('diagnosis', {
                name: 'Diagnosis Page',
                url: '/diagnosis',
                templateUrl: 'templates/diagnosis.html',
                controller: 'DiagnosisController'
            })

            .state('webgazer', {
                name: 'Webgazer Page',
                url: '/webgazer',
                templateUrl: 'templates/webgazer.html',
                controller: 'WebgazerController'
            })

        ;

        $urlRouterProvider.otherwise('/home');


    })

;


