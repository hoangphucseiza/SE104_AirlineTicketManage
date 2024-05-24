using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

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
        [HttpGet("GetDanhSachHangVe")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<HangVe>))]
        [ProducesResponseType(400)]
        public IActionResult GetDanhSachHangVe()
        {
            var sanBays = _mapper.Map<List<HangVeDto>>(_hangVeRepository.GetDanhSachHangVe());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBays);
        }

        [HttpPost("AddHangVe")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateHangVe([FromBody] HangVeDto hangVeCreate)
        {
            if (hangVeCreate == null)
                return BadRequest(ModelState);

            var hangve = _hangVeRepository.GetDanhSachHangVe()
                .Where(s => s.TenHV.Trim().ToUpper() == hangVeCreate.TenHV.TrimEnd().ToUpper() || s.MaHV == hangVeCreate.MaHV)
                .FirstOrDefault();

            if (hangve != null)
            {
                ModelState.AddModelError("", $"Hang ve {hangVeCreate.TenHV} da ton tai");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var hangVeMap = _mapper.Map<HangVe>(hangVeCreate);

            if (!_hangVeRepository.CreateHangVe(hangVeMap))
            {
                ModelState.AddModelError("", $"Something went wrong when saving the record {hangVeMap.TenHV}");
                return StatusCode(500, ModelState);
            }
            return Ok("Tạo Hạng Vé Thành Công");
        }


        [HttpPut("{maHV}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateHangVe(string maHV, [FromBody] HangVeDto hangVeUpdate)
        {
            if (UpdateHangVe == null)
                return BadRequest(ModelState);

            if (maHV != hangVeUpdate.MaHV)
                return BadRequest(ModelState);


            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var hangVeMap = _mapper.Map<HangVe>(hangVeUpdate);

            if (!_hangVeRepository.UpdateHangVe(hangVeMap))
            {
                ModelState.AddModelError("", "Something went wrong updating HangVe");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
