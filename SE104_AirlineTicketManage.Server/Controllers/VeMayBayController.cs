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

        [HttpGet("DoanhThuTheoThang/{thang}/{nam}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<BaoCaoDoanhTheoThangDto>))]
        [ProducesResponseType(400)]
        public IActionResult DoanhThuTheoThang(int thang, int nam)
        {
            var danhSachDoanhThu = _veMayBayRepository.DoanhThuTheoThang(thang, nam);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(danhSachDoanhThu);
        }

        [HttpGet("DoanhThuTheoNam/{nam}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<BaoCaoDoanhTheoNamDto>))]
        [ProducesResponseType(400)]
        public IActionResult DoanhThuTheoNam( int nam)
        {
            var danhSachDoanhThu = _veMayBayRepository.DoanhThuTheoNam(nam);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(danhSachDoanhThu);
        }

        [HttpPost("CreateVeMayBay")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateVeMayBay([FromQuery] string maCB, [FromQuery] string maKH, 
            [FromQuery] string maHV, [FromBody] CreateVeMayBayDto veMayBayCreate)
        {
            if (veMayBayCreate == null)
                return BadRequest(ModelState);

            if (_veMayBayRepository.VeMayBayExists(veMayBayCreate.MaVe))
            {
                ModelState.AddModelError("", "VeMayBay đã tồn tại");
                return StatusCode(422, ModelState);
            }
            
            var PokemonMap = _mapper.Map<VeMayBay>(veMayBayCreate);

            if(!_veMayBayRepository.CreateVeMayBay(maCB, maKH, maHV, PokemonMap))
            {
                ModelState.AddModelError("", $"Something went wrong when saving the record {veMayBayCreate.MaVe}");
                return StatusCode(500, ModelState);
            }
            return Ok("Tạo Vé Thành Công");
        }
       

        [HttpDelete("DeleteVeMayBay{maVe}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteVeMayBay(string maVe)
        {
            if (!_veMayBayRepository.VeMayBayExists(maVe))
                return NotFound();


            if (!_veMayBayRepository.DeleteVeMayBay(maVe))
            {
                ModelState.AddModelError("", $"Something went wrong when deleting the record {maVe}");
                return StatusCode(500, ModelState);
            }
            return Ok("Xóa vé máy bay thành công");
        }

        [HttpGet("GetVeByMaVe")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<TraCuuVeMayBayDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetVeByMaVe(string? searchMaVe, string hangVe, string loaiVe, int phantrang)
        {
            var veMayBays = _veMayBayRepository.GetVeByMaVe(searchMaVe, hangVe, loaiVe, phantrang);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(veMayBays);
        }

        [HttpGet("GetVeByMaCB")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<TraCuuVeMayBayDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetVeByMaCB(string? searchMaCB, string hangVe, string loaiVe, int phantrang)
        {
            var veMayBays = _veMayBayRepository.GetVeByMaCB(searchMaCB, hangVe, loaiVe, phantrang);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(veMayBays);
        }

        [HttpGet("GetVeBySDT")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<TraCuuVeMayBayDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetVeBySDT(string? searchSDT, string hangVe, string loaiVe, int phantrang)
        {
            var veMayBays = _veMayBayRepository.GetVeBySDT(searchSDT, hangVe, loaiVe, phantrang);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(veMayBays);
        }
    }
}
