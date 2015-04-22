using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJSTodoListWebApi.Models
{
    interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        User Get(int id);
        User Add(User user);
        void Remove(int id);
        bool Update(User user);
        void RemoveTodo(int userId, int todoId);
        Todo AddTodo(int userId, Todo todo);
        List<Todo> GetTodos(int userId);
    }
}
