using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;
using SE104_AirlineTicketManage.Server.Repository;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuyDinhChungController : Controller
    {
        private readonly IQuyDinhChungRepository _quyDinhChungRepository;
        private readonly IMapper _mapper;

        public QuyDinhChungController(IQuyDinhChungRepository quyDinhChungRepository, IMapper mapper)
        {
            _quyDinhChungRepository = quyDinhChungRepository;
            _mapper = mapper;
        }

        [HttpGet("GetThoiGianChamNhatDatVe")]
        [ProducesResponseType(200, Type = typeof(int))]
        public int GetThoiGianChamNhatDatVe()
        {
            int x = _quyDinhChungRepository.GetThoiGianChamNhatDatVe();
            return x;
        }

        [HttpGet("GetThoiGianHuyDatVe")]
        [ProducesResponseType(200, Type = typeof(int))]
        public int GetThoiGianHuyDatVe()
        {
            int x = _quyDinhChungRepository.GetThoiGianHuyDatVe();
            return x;
        }

        [HttpPut("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateThoiGianChamNhatDatVe(int id, [FromBody] QuyDinhChungDto quyDinhChungUpDate)
        {
            if (UpdateThoiGianChamNhatDatVe == null)
                return BadRequest(ModelState);

            if (id != quyDinhChungUpDate.ID)
                return BadRequest(ModelState);

            if (!_quyDinhChungRepository.QuyDinhChungExists(id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var quyDinhChungMap = _mapper.Map<QuyDinhChung>(quyDinhChungUpDate);

            if (!_quyDinhChungRepository.UpdateQuyDinhChung(quyDinhChungMap))
            {
                ModelState.AddModelError("", "Something went wrong updating Gioi gian cham nhat");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
