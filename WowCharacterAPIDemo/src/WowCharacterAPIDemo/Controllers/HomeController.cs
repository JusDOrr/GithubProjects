using Microsoft.AspNetCore.Mvc;

namespace WowCharacterAPIDemo.Controllers {
   public class HomeController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}
