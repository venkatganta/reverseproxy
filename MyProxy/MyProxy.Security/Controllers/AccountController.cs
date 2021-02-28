using Microsoft.AspNetCore.Mvc;
using MyProxy.Security.Models;
using System.Collections.Generic;

namespace MyProxy.Security.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Country> GetCountries()
        {
            List<Country> countries = new List<Country>()
            {
                new Country(){ CountryId=1,CountryName="TEST" },
                new Country(){CountryId=2,CountryName="TEST1"}
            };
            return countries;
        }

        [HttpPost]
        public IActionResult Login(LoginModel loginModel)
        {
            if (loginModel != null)
                return Ok(loginModel);
            else
                return Ok("Failed");
        }
    }
}
