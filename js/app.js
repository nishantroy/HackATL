/**
 * Created by nishantroy on 11/4/16.
 */
angular.module('myApp', ['ui.router', 'myAppControllers'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                name: 'Home Page',
                url: '/home',
                templateUrl: 'templates/home.html'
            })

            .state('diagnosis', {
                name: 'Diagnosis Page',
                url: '/diagnosis',
                templateUrl: 'templates/diagnosis.html',
                controller: 'DiagnosisController'
            })

        ;

        $urlRouterProvider.otherwise('/home');


    })


;


