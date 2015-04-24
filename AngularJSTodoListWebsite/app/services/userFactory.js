// N.B. a factory service returns the value result of the function(s) defined in factory (same value like when they are called)
// more here: https://groups.google.com/forum/#!msg/angular/56sdORWEoqg/HuZsOsMvKv4J
app.factory('userFactory', function($http) {

    var userFactory = {};

    userFactory.getUsers = function() {
        var request = $http.get('/api/admin/users');
        return request;
    }

    userFactory.insertUser = function(firstName, lastName) {
        var request = $http.post('/api/admin/users', { FirstName: firstName, LastName: lastName, Todos: [] });
        return (request);
    }

    userFactory.deleteUser = function(id) {
        var request = $http.delete('/api/admin/users/' + id);
        return (request);
    }

    userFactory.getUser = function(id) {
        var request = $http.get('/api/admin/users/' + id);
        return (request);
    }

    userFactory.createTodo = function(id, taskTitle, taskDesc, taskDueDate) {
        var request = $http.post('/api/admin/users/' + id + '/todos', { UserId: id, Title: taskTitle, Description: taskDesc, DueDate: taskDueDate });
        return (request);
    }

    return userFactory;
});