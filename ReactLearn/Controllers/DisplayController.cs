using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using ReactLearn.Reuse;

namespace ReactLearn.Controllers
{
    [Route("api/[controller]")]
    public class DisplayController : Controller
    {
        IConfiguration _configuration;
        public DisplayController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet("[action]")]
        public IActionResult GetEmployeeDetails()

        {
            
            string connectionString = _configuration.GetSection("Data").GetSection("ConnectionString").Value;
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_SelectEmployee", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Json(dt);
        }
        [HttpGet("[action]")]
        public IActionResult GetDepartmentList()
        {
            string connectionString = _configuration.GetSection("Data").GetSection("ConnectionString").Value;
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("sp_department", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Json(dt);
        }
        [HttpPost][ActionName("GetEmployeesUsingLike")]
        public IActionResult GetEmployeeLike([FromBody] string like)
        {
            string connectionString = _configuration.GetSection("Data").GetSection("ConnectionString").Value;
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("SP_EMPLOYEELIKE", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameter.Add(Parameter(SqlDbType.NVarChar,"@INPUT", like));
                    cmd.Parameters.Add("@INPUT", SqlDbType.NVarChar).Value = like;
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Json(dt);
        }
    }
}