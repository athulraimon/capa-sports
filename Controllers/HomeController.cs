using capa_app.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace capa_app.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("/Stats")]
        public IActionResult Stats()
        {
            return View();
        }

        [HttpGet("/Calendar")]
        public IActionResult Calendar()
        {
            return View();
        }

        [HttpGet("/Score")]
        public IActionResult Score()
        {
            return View();
        }

        [HttpGet("/User")]
        public IActionResult User()
        {
            return View();
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}