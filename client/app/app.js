'use strict';

angular.module('yoSalaryApp', [
  'yoSalaryApp.auth',
  'yoSalaryApp.admin',
  'yoSalaryApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
