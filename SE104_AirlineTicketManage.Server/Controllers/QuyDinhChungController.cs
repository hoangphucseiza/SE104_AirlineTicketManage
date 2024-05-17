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

        [HttpPut("UpdateChamNhatDatVe/{tg}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateThoiGianChamNhatDatVe(int tg)
        {
            _quyDinhChungRepository.UpdateThoiGianChamNhatDatVe(tg);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok("Cap nhat thanh cong.");
        }

        [HttpPut("UpdateHuyDatVe/{tg}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateThoiGianHuyDatVe(int tg)
        {
            _quyDinhChungRepository.UpdateThoiGianHuytDatVe(tg);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok("Cap nhat thanh cong.");
        }
    }
}
