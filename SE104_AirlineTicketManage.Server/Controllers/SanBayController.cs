using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;
using System.Data.SqlTypes;
using System.Reflection.Metadata.Ecma335;

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

        [HttpGet("GetDanhSachSanBay{phantrang}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SanBay>))]
        [ProducesResponseType(400)]
        public IActionResult GetSanBays(int phantrang)
        {
            var sanBays = _mapper.Map<List<SanBayDto>>(_sanBayRepository.GetDanhSachSanBay(phantrang));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBays);
        }


        [HttpGet("GetSanBayByMaSB/{maSB}")]
        [ProducesResponseType(200, Type = typeof(SanBay))]
        [ProducesResponseType(400)]
        public IActionResult GetSanBay(string maSB)
        {
            if (!_sanBayRepository.SanbayExists(maSB))
                return NotFound();

            var sanBay = _mapper.Map<SanBayDto>(_sanBayRepository.GetSanBayByMaSB(maSB));

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBay);
        }

        [HttpGet("GetSanBayByTGDungToiDa/{thoigiandung}/{phantrang}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SanBay>))]
        [ProducesResponseType(400)]
        public IActionResult GetSanBayByTGDungToiDa(int thoigiandung, int phantrang)
        {
            var sanBays = _mapper.Map<List<SanBayDto>>(_sanBayRepository.GetSanBayByTGDungToiDa(thoigiandung, phantrang));
   
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBays);
        }
        [HttpGet("GetSanBayByTGDungToiThieu/{thoigiandung}/{phantrang}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SanBay>))]
        [ProducesResponseType(400)]
        public IActionResult GetSanBayByTGDungToiThieu(int thoigiandung, int phantrang)
        {
            var sanBays = _mapper.Map<List<SanBayDto>>(_sanBayRepository.GetSanBayByTGDungToiThieu(thoigiandung, phantrang));

           
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBays);
        }

        [HttpGet("GetSanBayByTGDung/{dungtoithieu}/{dungtoida}/{phantrang}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SanBay>))]
        [ProducesResponseType(400)]
        public IActionResult GetSanBayByTGDung(int dungtoithieu, int dungtoida, int phantrang)
        {
            var sanBays = _mapper.Map<List<SanBayDto>>(_sanBayRepository.GetSanBayByTGDung(dungtoithieu, dungtoida , phantrang));

           
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBays);
        }

        [HttpGet("GetUpdateSanBay/{maSBdi}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UpdateSanBayDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetUpdateSanBay(string maSBdi)
        {
            var updateSanBayDto = _mapper.Map<UpdateSanBayDto>(_sanBayRepository.GetUpdateSanBay(maSBdi));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(updateSanBayDto);
        }

        [HttpPost("CreateSanBay")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateSanBay([FromBody] UpdateSanBayDto sanbaymoi)
        {
            string maSB = sanbaymoi.MaSanBay;

            var kiemTraTonTai = _sanBayRepository.GetSanBayByMaSB(maSB);
            
            if (kiemTraTonTai != null)
            {
                ModelState.AddModelError("", $"Sân bay {maSB} đã tồn tại");
                return StatusCode(404, ModelState);
            }

            bool taoSanBay = _sanBayRepository.CreateSanBay(sanbaymoi);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if(taoSanBay)
                return Ok("Tạo sân bay thành công");
            else
                return StatusCode(500, ModelState);
        }

        [HttpPut("UpdateSanBay")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateSanBay([FromBody] UpdateSanBayDto sanbaymoi)
        {

            bool capNhatSanBay = _sanBayRepository.UpdateSanBay(sanbaymoi);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (capNhatSanBay)
                return Ok("Cập nhật sân bay thành công");
            else
                return StatusCode(500, ModelState);
        }

        [HttpGet("GetSanBayBySearch/{search}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SanBay>))]
        [ProducesResponseType(400)]
        public IActionResult GetSanBayBySearch(string search)
        {
            var sanBays = _mapper.Map<List<SanBayDto>>(_sanBayRepository.GetSanBayBySearch(search));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBays);
        }

        [HttpGet("GetSanBayAll")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SanBay>))]
        [ProducesResponseType(400)]
        public IActionResult GetSanBayAll()
        {
            var sanBays = _mapper.Map<List<SanBayDto>>(_sanBayRepository.GetSanBayAll());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBays);
        }

    }
}
