using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Interfaces;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoSanBayDungController : Controller
    {
        private readonly ISoSanBayDungRepository _soSanBayDungRepository;

        public SoSanBayDungController(ISoSanBayDungRepository soSanBayDungRepository)
        {
            _soSanBayDungRepository = soSanBayDungRepository;
        }

        [HttpGet("GetSoSanBayDungMax/{MaSB1}/{MaSB2}")]
        [ProducesResponseType(200, Type = typeof(int))]
        [ProducesResponseType(404)] 
        public IActionResult GetSoSanBayDungMax(string MaSB1, string MaSB2)
        {
            if (!_soSanBayDungRepository.SoSanBayDungExists(MaSB1, MaSB2))
                return NotFound("Không tìm thấy cặp mã sân bay");

            int x = _soSanBayDungRepository.GetSoSBDungToiDa(MaSB1, MaSB2);
            return Ok(x);
        }

        [HttpPut("UpdateSoSBDungMax")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateSoSBDungMax([FromQuery]string MaSB1,[FromQuery] string MaSB2,[FromQuery] int SoSBDungMax)
        {
            if (!_soSanBayDungRepository.SoSanBayDungExists(MaSB1, MaSB2))
                return NotFound("Không tìm thấy cặp mã sân bay");

            _soSanBayDungRepository.UpdateSoSBDungToiDa(MaSB1, MaSB2, SoSBDungMax);
            return Ok("Thay đổi thành công");
        }

        [HttpGet("GetThoiGianBayToiThieu/{MaSB1}/{MaSB2}")]
        [ProducesResponseType(200, Type = typeof(int))]
        [ProducesResponseType(404)]
        public IActionResult GetThoiGianBayToiThieu(string MaSB1, string MaSB2)
        {

            int x = _soSanBayDungRepository.GetThoiGianBayToiThieu(MaSB1, MaSB2);
            return Ok(x);
        }

    }
}
