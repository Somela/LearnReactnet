using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactLearn.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string SecurityQuestion { get; set; }
        public string SecurityAnswers { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
