using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Interfaces;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HangVeController : Controller
    {
        private readonly IHangVeRepository _hangVeRepository;
        private readonly IMapper _mapper;

        public HangVeController(IHangVeRepository hangVeRepository, IMapper mapper)
        {
            _hangVeRepository = hangVeRepository;
            _mapper = mapper;
        }

        [HttpGet("GetTiLeGiaByMaHV/{MaHV}")]
        [ProducesResponseType(200, Type = typeof(float))]
        public float GetTiLeGiaByMaHV(string MaHV)
        {
            float x = _hangVeRepository.GetTiLeHangVe(MaHV);
            return x;
        }
    }
}
