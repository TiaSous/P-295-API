
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API_ASP_Book.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly ILogger<BookController> _logger;
        private readonly IMediator _mediator;

        public BookController(ILogger<BookController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet(Name = "GetBooksWithDetails")]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new GetBooksQuery(), cancellationToken);
            return result is null ? NotFound() : Ok(result);
        }
    }
}