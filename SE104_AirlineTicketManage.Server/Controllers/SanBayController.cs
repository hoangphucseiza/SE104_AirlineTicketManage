using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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

        [HttpGet("GetDanhSachSanBay")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SanBay>))]
        [ProducesResponseType(400)]
        public IActionResult GetSanBays()
        {
            var sanBays = _mapper.Map<List<SanBayDto>>(_sanBayRepository.GetSanBays());

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

            var sanBay = _mapper.Map<SanBayDto>(_sanBayRepository.GetSanBay(maSB));

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sanBay);
        }

        [HttpPost("AddSanBay")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateCategory([FromBody] SanBayDto sanBayCreate)
        {
            if (sanBayCreate == null)
                return BadRequest(ModelState);

            var sanBay = _sanBayRepository.GetSanBays()
                .Where(s => s.TenSB.Trim().ToUpper() == sanBayCreate.TenSB.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (sanBay != null)
            {
                ModelState.AddModelError("", $"San bay {sanBayCreate.TenSB} da ton tai");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                
            var sanBayMap = _mapper.Map<SanBay>(sanBayCreate);

            if(!_sanBayRepository.CreateSanBay(sanBayMap))
            {
                ModelState.AddModelError("", $"Something went wrong when saving the record {sanBayMap.TenSB}");
                return StatusCode(500, ModelState);
            }    
            return Ok("Tạo Sân Bay Thành Công");
        }

        //[HttpPut("UpdateSanBay")]
        //[ProducesResponseType(400)]
        //[ProducesResponseType(204)]
        //[ProducesResponseType(404)]
        //public IActionResult UpdateCategory
    }
}
