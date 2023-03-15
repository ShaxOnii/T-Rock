using Microsoft.AspNetCore.Mvc;

namespace T_Rock.Controllers
{
    public class UserController : Controller
    {
        public IActionResult UserName()
        {
            return View();
        }
    }
}
