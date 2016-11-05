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

        ;

        $urlRouterProvider.otherwise('/home');


    })


;


