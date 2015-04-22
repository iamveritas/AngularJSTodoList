using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularJSTodoListWebApi.Models;

namespace AngularJSTodoListWebApi.Controllers
{
    [RoutePrefix("admin")]
    public class UserController : ApiController
    {
        static readonly IUserRepository DbUserRepository = new UserRepository();
 
        [Route("users")]
        public IEnumerable<User> GetUsers()
        {
            return DbUserRepository.GetUsers();
        }

        [Route("users/{id}")]
        public User GetUserById(int id)
        {
            User user = DbUserRepository.Get(id);
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return user;
        }

        [Route("users")]
        public HttpResponseMessage PostUser(User user)
        {
            user = DbUserRepository.Add(user);
            var response = this.Request.CreateResponse<User>(HttpStatusCode.Created, user);
            return response;
        }

        [Route("users")]
        public bool PutUser(User user)
        {
            if (!DbUserRepository.Update(user))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return true;
        }

        [Route("users/{id}")]
        public void DeleteUser(int id)
        {
            User user = DbUserRepository.Get(id);
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            DbUserRepository.Remove(id);
        }

        [Route("users/{userId}/todos/{todoId}")]
        public void DeleteTodo(int userId, int todoId)
        {
            User user = DbUserRepository.Get(userId);
            user.Todos.RemoveAll(t => t.Id == todoId);
        }

        [Route("users/{userId}/todos")]
        public HttpResponseMessage PostTodo(int userId, Todo todo)
        {
            Todo addedTodo = DbUserRepository.AddTodo(userId, todo);
            var response = this.Request.CreateResponse<Todo>(HttpStatusCode.Created, addedTodo);
            return response;
        }

        [Route("users/{userId}/todos")]
        public List<Todo> GetTodos(int userId)
        {
            User user = DbUserRepository.Get(userId);
            return user.Todos;
        }
    }
}
