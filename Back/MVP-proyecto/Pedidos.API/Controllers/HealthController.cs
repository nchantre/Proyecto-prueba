using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pedidos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok("Pedidos service running");
        }

        [HttpGet("status")]
        public IActionResult Status()
        {
            return Ok(new
            {
                service = "Perdidos",
                status = "ok"
            });
        }
    }
}
