'use strict';

angular.module('yoSalaryApp.auth', [
  'yoSalaryApp.constants',
  'yoSalaryApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
