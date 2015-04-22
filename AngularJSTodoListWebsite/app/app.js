

var app = angular.module('AngularJSTodoListListApp', ['ngRoute']);

app.constant('version', '1.0');
app.constant('author', 'Ovi-Wan Kenobi');

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




