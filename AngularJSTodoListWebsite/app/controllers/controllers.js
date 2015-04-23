// here we define all the controllers that the app is using

app.controller('AngularJSTodoListListAppController', 
    ["author", "version", function AngularJSTodoListListAppController(author, version) {
        this.author = author;
        this.version = version;
    }]
);

app.controller('userControllerWithService',
    ['$scope', '$http', '$routeParams', 'userService',
      function ($scope, $http, $routeParams, userService) {

        $scope.usersList = [];
        $scope.loading = true;
        $scope.loadingOneUser = true;
        $scope.user = {}; // used in case only one customer is selected

        $scope.init = function init() {
            $scope.loading = true;
            userService.getUsers().success(function (data) {
                $scope.usersList = data;
                $scope.loading = false;
            }).error(function (data) {
                $scope.loading = false;
                console.log('userControllerWithService.init():err:' + data);
            });

            // initialize the user in case a user is selected (by reading first the userId from route)
            $scope.loadingOneUser = true;
            var userId = ($routeParams.userId) ? parseInt($routeParams.userId) : 0;
            if (userId > 0) {
                userService.getUser(userId).success(function (data) {
                    $scope.user = data;
                    $scope.loadingOneUser = false;
                }).error(function (data) {
                    $scope.loadingOneUser = false;
                    console.log('userControllerWithService.init():err:' + data);
                });
            }

            if ($scope.usersList)
                console.log('usersList count ' + $scope.usersList.length);
        }

        $scope.insertUser = function () {
            var firstName = $scope.newUser.FirstName;
            var lastName = $scope.newUser.LastName;
            $scope.loading = true;
            userService.insertUser(firstName, lastName).
                success(function (data) {
                    // refresh users list
                    $scope.init();
                    $scope.loading = false;
                }).error(function (data) {
                    $scope.loading = false;
                    console.log('userControllerWithService.insertUser():err:' + data);
                });
            $scope.newUser.FirstName = '';
            $scope.newUser.LastName = '';
            if ($scope.usersList)
                console.log('usersList count ' + $scope.usersList.length);
        }

        $scope.deleteUser = function(userId) {
            $scope.loading = true;
            userService.deleteUser(userId).
                success(function (data) {
                    // refresh users list
                    $scope.init();
                    $scope.loading = false;
                }).error(function (data) {
                    $scope.loading = false;
                    console.log('userControllerWithService.deleteUser():err:' + data);
                });
            if ($scope.usersList)
                console.log('usersList count ' + $scope.usersList.length);
        }

        $scope.getUserFullName = function (user) {
            return user.FirstName + ' ' + user.LastName;
        }

        $scope.createTodo = function (userSelectedId, title, description, duedate) {
            $scope.loading = true;
            userService.createTodo(userSelectedId, title, description, duedate).
                success(function (data) {
                    // refresh users list
                    $scope.init();
                    $scope.loading = false;
                }).error(function (data) {
                    $scope.loading = false;
                    console.log('userControllerWithService.createTodo():err:' + data);
                });
            if ($scope.usersList)
                console.log('usersList count ' + $scope.usersList.length);
        }

        $scope.init();
    }]
);

app.controller('userControllerWithFactory',
    ['$scope', '$http', '$routeParams', 'userFactory',
      function ($scope, $http, $routeParams, userFactory) {

          $scope.usersList = [];
          $scope.loading = true;
          $scope.loadingOneUser = true;
          $scope.user = {}; // used in case only one customer is selected

          $scope.init = function init() {
              $scope.loading = true;
              userFactory.getUsers().success(function (data) {
                  $scope.usersList = data;
                  $scope.loading = false;
              }).error(function (data) {
                  $scope.loading = false;
                  console.log('userControllerWithService.init():err:' + data);
              });

              // initialize the user in case a user is selected (by reading first the userId from route)
              $scope.loadingOneUser = true;
              var userId = ($routeParams.userId) ? parseInt($routeParams.userId) : 0;
              if (userId > 0) {
                  userFactory.getUser(userId).success(function (data) {
                      $scope.user = data;
                      $scope.loadingOneUser = false;
                  }).error(function (data) {
                      $scope.loadingOneUser = false;
                      console.log('userControllerWithService.init():err:' + data);
                  });
              }

              if ($scope.usersList)
                  console.log('usersList count ' + $scope.usersList.length);
          }

          $scope.insertUser = function () {
              var firstName = $scope.newUser.FirstName;
              var lastName = $scope.newUser.LastName;
              $scope.loading = true;
              userFactory.insertUser(firstName, lastName).
                  success(function (data) {
                      // refresh users list
                      $scope.init();
                      $scope.loading = false;
                  }).error(function (data) {
                      $scope.loading = false;
                      console.log('userControllerWithService.insertUser():err:' + data);
                  });
              $scope.newUser.FirstName = '';
              $scope.newUser.LastName = '';
              if ($scope.usersList)
                  console.log('usersList count ' + $scope.usersList.length);
          }

          $scope.deleteUser = function (userId) {
              $scope.loading = true;
              userFactory.deleteUser(userId).
                  success(function (data) {
                      // refresh users list
                      $scope.init();
                      $scope.loading = false;
                  }).error(function (data) {
                      $scope.loading = false;
                      console.log('userControllerWithService.deleteUser():err:' + data);
                  });
              if ($scope.usersList)
                  console.log('usersList count ' + $scope.usersList.length);
          }

          $scope.getUserFullName = function (user) {
              return user.FirstName + ' ' + user.LastName;
          }

          $scope.createTodo = function (userSelectedId, title, description, duedate) {
              $scope.loading = true;
              userFactory.createTodo(userSelectedId, title, description, duedate).
                  success(function (data) {
                      // refresh users list
                      $scope.init();
                      $scope.loading = false;
                  }).error(function (data) {
                      $scope.loading = false;
                      console.log('userControllerWithService.createTodo():err:' + data);
                  });
              if ($scope.usersList)
                  console.log('usersList count ' + $scope.usersList.length);
          }

          $scope.init();
      }]
);
// generic template to devine a new controller
app.controller('controllerName', function ($scope) {

});
