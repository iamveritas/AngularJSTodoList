// N.B. a service service (this is not a typo!) returns the reference(s) to the function(s) defined by the service
// more here: https://groups.google.com/forum/#!msg/angular/56sdORWEoqg/HuZsOsMvKv4J
app.service('userService', function ($http) {

    var us = this;

    us.readFromDB = true;

    init();

    function init() {

        us.readFromDB = true;

        if (us.readFromDB) {
            us.users = [];
        }
    }

    this.getUsers = function () {
        // TO DO: make an easy switch between reading from webApi or from local in memory store
        if (us.readFromDB) {
            var request = $http.get('/api/admin/users');
            return request;
        }
        else {
            return us.users;
        }
    };

    this.insertUser = function (FirstName, LastName) {
        // TO DO: make an easy switch between reading from webApi or from local in memory store
        if (us.readFromDB) {
            var request = $http.post('/api/admin/users', { FirstName: FirstName, LastName: LastName, Todos: [] });
            return (request);
        }
        else {
            var topId = users.length + 1;
            users.push({
                id: topId,
                FirstName: FirstName,
                LastName: LastName,
                Todos: []
            });
        }
    };

    this.deleteUser = function (id) {
        // TO DO: make an easy switch between reading from webApi or from local in memory store
        if (us.readFromDB) {
            var request = $http.delete('/api/admin/users/' + id);
            return (request);
        }
        else {
            for (var i = users.length - 1; i >= 0; i--) {
                if (users[i].id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
        }
    };

    this.getUser = function (id) {
        // TO DO: make an easy switch between reading from webApi or from local in memory store
        if (us.readFromDB) {
            var request = $http.get('/api/admin/users/' + id);
            return (request);
        }
        else {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === id) {
                    return users[i];
                }
            }
        }
        return null;
    };

    this.createTodo = function(id, taskTitle, taskDesc, taskDueDate) {
        if (us.readFromDB) {
            var request = $http.post('/api/admin/users/'+id+'/todos', { UserId: id, Title: taskTitle, Description: taskDesc, DueDate: taskDueDate });
            return (request);
        } else {
            var topId = users.length + 1;
            users.push({
                id: topId,
                FirstName: FirstName,
                LastName: LastName,
                Todos: []
            });
        }
    }

    // in memory local store for users + Todos
    us.users = [
        {
            Id: 1, FirstName: 'Lee', LastName: 'Carroll',
            Todos: [
                { title: 'Task 1', description: 'task1 description but not a novel', duedate: '2015-01-01'},
                { title: 'Task 2', description: 'task2 description but not a novel', duedate: '2015-02-02' },
                { title: 'Task 3', description: 'task3 description but not a novel', duedate: '2015-04-04' }
            ]
        },
        {
            Id: 2, FirstName: 'Jesse', LastName: 'Hawkins',
            Todos: [
                { title: 'Task 1', description: 'task1 description but not a novel', duedate: '2015-01-01' },
                { title: 'Task 3', description: 'task3 description but not a novel', duedate: '2015-04-04' }
            ]
        },
        {
            Id: 3, FirstName: 'Charles', LastName: 'Sutton', 
            Todos: [
                { title: 'Task 1', description: 'task1 description but not a novel', duedate: '2015-01-01' },
                { title: 'Task 2', description: 'task2 description but not a novel', duedate: '2015-02-02' },
                { title: 'Task 3', description: 'task3 description but not a novel', duedate: '2015-04-04' }
            ]
        },
        {
            
            Id: 4, FirstName: 'Albert', LastName: 'Einstein', 
            Todos: [
                { title: 'Task 1', description: 'task1 description but not a novel', duedate: '2015-01-01' },
                { title: 'Task 2', description: 'task2 description but not a novel', duedate: '2015-02-02' }
            ]
        },
        {
            Id: 5, FirstName: 'Sonya', LastName: 'Williams', 
        },
        {
            Id: 6, FirstName: 'Victor', LastName: 'Bryan',
            Todos: [
                { title: 'Task 1', description: 'task1 description but not a novel', duedate: '2015-01-01' }
            ]
        },
        {
            Id: 7, FirstName: 'Lynette', LastName: 'Gonzalez', 
            Todos: [
                { title: 'Task 1', description: 'task1 description but not a novel', duedate: '2015-01-01' }
            ]
        },
        {
            Id: 8, FirstName: 'Erick', LastName: 'Pittman', 
            Todos: [
                { title: 'Task 1', description: 'task1 description but not a novel', duedate: '2015-01-01' },
                { title: 'Task 2', description: 'task2 description but not a novel', duedate: '2015-02-02' },
                { title: 'Task 3', description: 'task3 description but not a novel', duedate: '2015-04-04' }
            ]
        },
        {
            Id: 9, FirstName: 'Alice', LastName: 'Price', 
            Todos: [
                { title: 'Task 3', description: 'task3 description but not a novel', duedate: '2015-04-04' }
            ]
        },
        {
            Id: 10, FirstName: 'Gerard', LastName: 'Tucker', 
            Todos: [
                { title: 'Task 1', description: 'task1 description but not a novel', duedate: '2015-01-01' },
                { title: 'Task 2', description: 'task2 description but not a novel', duedate: '2015-02-02' },
                { title: 'Task 3', description: 'task3 description but not a novel', duedate: '2015-04-04' }
            ]
        },
        {
            Id: 11, FirstName: 'Lili', LastName: 'Marlene', 
        }
    ];

});