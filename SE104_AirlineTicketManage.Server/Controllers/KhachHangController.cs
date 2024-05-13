using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : Controller
    {
        private readonly IKhachHangRepository _khachHangRepository;
        private readonly IMapper _mapper;

        public KhachHangController(IKhachHangRepository khachHangRepository, IMapper mapper)
        {
            _khachHangRepository = khachHangRepository;
            _mapper = mapper;
        }

        [HttpGet("GetDanhSachKhachHang")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<KhachHang>))]
        [ProducesResponseType(400)]
        public IActionResult GetKhachHangs()
        {
            var khachHangs = _mapper.Map<List<KhachHangDto>>(_khachHangRepository.GetKhachHangs());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(khachHangs);
        }
    }
}
