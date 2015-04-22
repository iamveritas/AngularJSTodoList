using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJSTodoListWebApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Todo> Todos { get; set; }
    }
}