
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;
using System.Runtime.CompilerServices;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChuyenBayController : Controller
    {
        private readonly IChuyenBayRepository _chuyenBayRepository;
        private readonly IMapper _mapper;
        public ChuyenBayController(IChuyenBayRepository chuyenBayRepository, IMapper mapper)
        {
            _chuyenBayRepository = chuyenBayRepository;
            _mapper = mapper;
        }

        [HttpGet("Get4ChuyenBay")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<DanhSachChuyenBayDto>))]
        public IActionResult Get4ChuyenBay()
        {
            var chuyenBays = _chuyenBayRepository.Get4ChuyenBay();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(chuyenBays);
        }
        [HttpGet("GetChuyenBayByID/{maCB}")]
        [ProducesResponseType(200, Type = typeof(ChuyenBay))]
        [ProducesResponseType(400)]
        public IActionResult GetChuyenBay(string maCB)
        {
            if (!_chuyenBayRepository.ChuyenBayExists(maCB))
                return NotFound();

            var chuyenBay = _mapper.Map<ChuyenBayDto>(_chuyenBayRepository.GetChuyenBay(maCB));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(chuyenBay);
        }
        [HttpGet("GetVeMayBayFromChuyenBay/{maCB}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<VeMayBay>))]
        [ProducesResponseType(400)]
        public IActionResult GetVeMayBayFromChuyenBay(string maCB)
        {
            if (!_chuyenBayRepository.ChuyenBayExists(maCB))
                return NotFound();

            var veMayBays = _mapper.Map<List<VeMayBayDto>>(_chuyenBayRepository.GetVeMayBayFromChuyenBay(maCB));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(veMayBays);
        }

        [HttpGet("ThongKeTrangChu")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<dynamic>))]
        public IActionResult ThongKeTrangChu()
        {
            var thongKe = _chuyenBayRepository.ThongKeTrangChu();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(thongKe);
        }
    }
}
