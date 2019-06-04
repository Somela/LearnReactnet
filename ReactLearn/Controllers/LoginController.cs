using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ReactLearn.Reuse;


namespace ReactLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]UserModel login)
        {
            IActionResult response = Unauthorized();
            LoginResponse responseMessage = new LoginResponse();
            string connectionString = _configuration.GetSection("Data").GetSection("ConnectionString").Value;
            SqlConnection con = new SqlConnection(connectionString);
            string query = "select UserName,Password from Register where Username = '" + login.Username +"'";
            SqlCommand cmd = new SqlCommand(query,con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                string username = dr["Username"].ToString();
                string password = dr["Password"].ToString();
                var user = AuthenticateUser(username,password);

                if (user != null)
                {
                    var tokenString = GenerateJSONWebToken(user);
                    response = Ok(new { tokenString,username });
                }
            }
            return response;
        }

        private string GenerateJSONWebToken(UserModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserModel AuthenticateUser(string username,string password)
        {
            UserModel user = null;

            //Validate the User Credentials  
            //Demo Purpose, I have Passed HardCoded User Information  
            return user = new UserModel { Username = username, Password = password }; ;
        }
        
    }
}