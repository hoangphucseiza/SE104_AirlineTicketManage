using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanBayController : Controller
    {
        private readonly ISanBayRepository _sanBayRepository;
        private readonly IMapper _mapper;

        public SanBayController(ISanBayRepository sanBayRepository, IMapper mapper)
        {
            _sanBayRepository = sanBayRepository;
            _mapper = mapper;
        }

        [HttpGet("GetSanBayByMaSB/{maSB}")]
        [ProducesResponseType(200, Type = typeof(SanBay))]
        [ProducesResponseType(400)]
        public IActionResult GetSanBay(string maSB)
        {
            if (!_sanBayRepository.SanbayExists(maSB))
                return NotFound();

            var sanBay = _mapper.Map<SanBayDto>(_sanBayRepository.GetSanBay(maSB));

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBay);
        }
    }
}
