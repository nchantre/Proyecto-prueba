using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace User.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok("Usuarios service running");
        }

        [HttpGet("status")]
        public IActionResult Status()
        {
            return Ok(new
            {
                service = "usuarios",
                status = "ok"
            });
        }
    }
}
