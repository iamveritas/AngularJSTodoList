

var app = angular.module('AngularJSTodoListListApp', ['ngRoute']);

// using of constant service; the author suppose to not change, be constant :)
app.constant('author', 'Ovi-Wan Kenobi');

// using the value service; the version would eventually change, therefor not a constant.
app.value('version', '1.0');


//This code configures the app routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/users',
            {
                templateUrl: 'app/partials/users.html',
                controller: 'userController'
            })
        //Define a route that has a route parameter in it (:userId)
        .when('/userTodos/:userId',
            {
                templateUrl: 'app/partials/userTodos.html',
                controller: 'userController'
            })
        .when('/Todos',
            {
                templateUrl: 'app/partials/allUsersTodos.html',
                controller: 'userController'
            })
        .otherwise({ redirectTo: '/users' });
});




