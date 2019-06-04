using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForgetController : Controller
    {
        private IConfiguration _configuration;

        public ForgetController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Forget([FromBody]string username)
        {
            try
            {
                string connectionString = _configuration.GetSection("Data").GetSection("ConnectionString").Value;
                SqlConnection con = new SqlConnection(connectionString);
                string query = "select * from Register where Username = '" + username + "'";
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                return Json(dt);
            }
            catch(Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}