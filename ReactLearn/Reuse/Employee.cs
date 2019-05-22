using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactLearn.Reuse
{
    public class Employee
    {
        public int EmpID { get; set; }
        public string EmpName { get; set; }
        public DateTime JoiningDate { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentLocation { get; set; }
        public Decimal Salary { get; set; }
        public Decimal Commission { get; set; }
        public string Manager { get; set; }
    }
    public class EmployeeLike
    {
        public string input { get; set; }
    }
}
