using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJSTodoListWebApi.Models
{
    public class UserRepository : IUserRepository
    {
        private readonly List<User> _allUsers = new List<User>(); // this simulates the list of all users in DB
        private int _startingDbIdentity = 0; // this simulates the auto increment identity from DB, and is zero based indexed
        private IUserRepository iUserRepository;

        // init this repository, simulating we have real users in DB
        private void Init()
        {
            iUserRepository.Add(new User { LastName = "Lennon", FirstName = "Ovi" , Todos = new List<Todo>()});
            iUserRepository.Add(new User { LastName = "McCartney", FirstName = "Taylor", Todos = new List<Todo>() });
            iUserRepository.Add(new User { LastName = "Harrison", FirstName = "Claudia", Todos = new List<Todo>() });
            iUserRepository.Add(new User { LastName = "Starr", FirstName = "Maria", Todos = new List<Todo>() });
            iUserRepository.Add(new User { LastName = "Christmas", FirstName = "Johnny", Todos = new List<Todo>() });
        }

        public UserRepository()
        {
            iUserRepository = this;
            Init();
        }

        IEnumerable<User> IUserRepository.GetUsers()
        {
            return _allUsers;
        }

        User IUserRepository.Get(int id)
        {
            return _allUsers.Find(u => u.Id == id);
        }

        User IUserRepository.Add(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("user");
            }
            user.Id = ++_startingDbIdentity;
            _allUsers.Add(user);
            return user;
        }

        void IUserRepository.Remove(int id)
        {
            _allUsers.RemoveAll(u => u.Id == id);
        }

        bool IUserRepository.Update(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("user");
            }
            int index = _allUsers.FindIndex(u => u.Id == user.Id);
            if (index == -1)
            {
                return false;
            }
            _allUsers.RemoveAt(index);
            _allUsers.Add(user);
            return true;
        }

        void IUserRepository.RemoveTodo(int userId, int todoId)
        {
            if (userId < 0 || todoId < 0)
            {
                throw new ArgumentException(String.Format("Index out of range (userId:{0}, todoId:{1}). Id range is [0, ...)", userId, todoId));
            }
            User user = iUserRepository.Get(userId);
            int index = user.Todos.FindIndex(t => t.Id == todoId);
            if (index >= 0)
                user.Todos.RemoveAt(index);
            else
            {
                throw new IndexOutOfRangeException("todoId could not be found");
            }
        }

        /// <summary>
        /// Todo.Id is not needed to be specified; it will be set/handled internally
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="todo"></param>
        Todo IUserRepository.AddTodo(int userId, Todo todo)
        {
            if (todo == null)
            {
                throw new ArgumentNullException("todo");
            }
            User user = iUserRepository.Get(userId);
            lock (user)
            {
                todo.Id = user.Todos.Count() + 1;
                user.Todos.Add(todo);                
            }
            return todo;
        }

        /// <summary>
        /// Get all Todos for one user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        List<Todo> IUserRepository.GetTodos(int userId)
        {
            User user = iUserRepository.Get(userId);
            return user.Todos;
        }
    }
}