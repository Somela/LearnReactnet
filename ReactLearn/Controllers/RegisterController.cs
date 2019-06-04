using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactLearn.Reuse;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : Controller
    {
        private IConfiguration _configuration;
        public RegisterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Regiser([FromBody]UserModel user)
        {
            try
            {
                string connectionString = _configuration.GetSection("Data").GetSection("ConnectionString").Value;
                string query = "insert into Register values('" + user.FirstName + "','" + user.LastName + "','" + user.Username + "','" + user.Password + "','" + user.SecurityQuestion + "','" + user.SecurityAnswers + "')";
                SqlConnection con = new SqlConnection(connectionString);
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
                return Json("Sucesssfully inserted Please Login Again");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}
