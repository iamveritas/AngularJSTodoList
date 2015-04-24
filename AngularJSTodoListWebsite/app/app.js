

var app = angular.module('AngularJSTodoListListApp', ['ngRoute']);

// using of constant service; the author suppose to not change, hence the constant service
// this can be used just like value service + in app.config
app.constant('author', 'Ovi-Wan Kenobi');

// using the value service; the version would eventually change, therefor not a constant.
// value service can not be used in app.config as the constant service can
app.value('version', '1.0');


//This code configures the app routes and associates each route with a view and a controller
// N.B. the name of the provider is userProviderProvider, because the name when it was declared was userProvider
app.config(['$routeProvider',  'userProviderProvider', function ($routeProvider, userProviderProvider) {
    $routeProvider
        .when('/users',
            {
                templateUrl: 'app/partials/users.html',
                //controller: 'userControllerWithFactory'
                //controller: 'userControllerWithService'
                controller: 'userControllerWithProvider'
            })
        //Define a route that has a route parameter in it (:userId)
        .when('/userTodos/:userId',
            {
                templateUrl: 'app/partials/userTodos.html',
                //controller: 'userControllerWithFactory'
                //controller: 'userControllerWithService'
                controller: 'userControllerWithProvider'
            })
        .when('/Todos',
            {
                templateUrl: 'app/partials/allUsersTodos.html',
                //controller: 'userControllerWithFactory'
                //controller: 'userControllerWithService'
                controller: 'userControllerWithProvider'
            })
        .otherwise({ redirectTo: '/users' });

    //console.info(userProviderProvider);
    //console.info(userProviderProvider.$get());

    userProviderProvider.setUrl('/api/admin/users');
}]);




