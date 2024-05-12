using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Interfaces;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuyDinhChungController : Controller
    {
        private readonly IQuyDinhChungRepository _quyDinhChungRepository;

        public QuyDinhChungController(IQuyDinhChungRepository quyDinhChungRepository)
        {
            _quyDinhChungRepository = quyDinhChungRepository;
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
    }
}
