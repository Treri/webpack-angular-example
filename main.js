module.exports = Promise.all([
  require('app.js'),
  require('runtimes/services/serviceRootA.js'),
  require('controllers/rootCtrl.js')
]).then(function([app, ...args]) {

  var requirePromise = function(loading) {
    return function() {
      return new Promise(loading);
    }
  };
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

      // $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/example/');

      $stateProvider
        .state('example', {
          abstract: true,
          url: '/example',
          template: '<div ui-view></div>',
          controller: 'rootCtrl',
        })
        .state('example.home', {
          url: '/',
          templateUrl: 'views/home.html',
          controller: 'homeCtrl',
          resolve: {
            deps: requirePromise(function(resolve) {
              require([
                'controllers/homeCtrl'
              ], resolve);
            })
          }
        })
        .state('example.foo', {
          url: '/foo',
          templateUrl: 'views/foo.html',
          controller: 'fooCtrl',
          resolve: {
            deps: requirePromise(function(resolve) {
              require([
                'controllers/fooCtrl'
              ], resolve);
            })
          }
        })
        .state('example.bar', {
          url: '/bar',
          templateUrl: 'views/bar.html',
          controller: 'barCtrl',
          resolve: {
            deps: requirePromise(function(resolve) {
              require([
                'controllers/barCtrl'
              ], resolve);
            })
          }
        })
    }
  ])

  angular.bootstrap(document, ['webpack-example']);
});
