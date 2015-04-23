
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