using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VeMayBayController : Controller
    {
        
        private readonly IVeMayBayRepository _veMayBayRepository;
        private readonly IMapper _mapper;

        public VeMayBayController(IVeMayBayRepository veMayBayRepository, IMapper mapper)
        {
            _veMayBayRepository = veMayBayRepository;
            _mapper = mapper;
        }
        [HttpGet("GetDanhSachVeMayBay")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<VeMayBay>))]
        [ProducesResponseType(400)]
        public IActionResult GetVeMayBays()
        {
            var veMayBays = _mapper.Map<List<VeMayBayDto>>(_veMayBayRepository.GetVeMayBays());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(veMayBays);
        }
    }
}
