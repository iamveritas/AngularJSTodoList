// N.B. You CANNOT inject a service into the provider configuration section.
//      You CAN inject a service into the section which initializes the provider's service.
//      Angular framework has a 2 phase initialization process: config and run (SECTION 1 and SECTION 2 below)
//      That's why compared with the factory and service sevices, this one will not have injected at this level the $http service
// more here: https://groups.google.com/forum/#!msg/angular/56sdORWEoqg/HuZsOsMvKv4J
app.provider('userProvider', function () {

    // SECTION 1: code to initialize/configure the PROVIDER goes here (executed during `config` phase)
    var _url = '/api/admin/users';

    this.setUrl = function (url) {
        _url = url;
    }

    this.$get = function ($http) {
        return {
            // SECTION 2: code to initialize/configure the SERVICE goes here (executed during `run` stage)
            getUsers: function () {
                return $http.get(_url);
            },
            insertUser: function (firstName, lastName) {
                return $http.post(_url, { FirstName: firstName, LastName: lastName, Todos: [] });
            },
            deleteUser: function (id) {
                return $http.delete(_url + '/' + id);
            },
            getUser: function (id) {
                return $http.get(_url + '/' + id);
            },
            createTodo: function (id, taskTitle, taskDesc, taskDueDate) {
                return $http.post(_url + '/' + id + '/todos', { UserId: id, Title: taskTitle, Description: taskDesc, DueDate: taskDueDate });
            }
        };
    };
});