using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VeMayBayController : Controller
    {
        private readonly DataContext _context;
        private readonly IVeMayBayRepository _veMayBayRepository;
        private readonly IMapper _mapper;

        public VeMayBayController(IVeMayBayRepository veMayBayRepository, IMapper mapper, DataContext dataContext)
        {
            _veMayBayRepository = veMayBayRepository;
            _mapper = mapper;
            _context = dataContext;
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

        [HttpPut("CapNhatTrangThaiVe")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CapNhatTrangThaiVe([FromQuery] string maVe, [FromQuery] string TrangThai, [FromQuery] DateTime NgayMua)
        {
            if (!_veMayBayRepository.VeMayBayExists(maVe))
                return NotFound();

            if (!_veMayBayRepository.CapNhatTrangThaiVe(maVe, TrangThai, NgayMua))
            {
                ModelState.AddModelError("", $"Something went wrong when updating the record {maVe}");
                return StatusCode(500, ModelState);
            }
            return Ok("Cập nhật trạng thái vé máy bay thành công");
        }

        [HttpPut("CapNhatVeMayBayMoiNgay")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CapNhatVeMayBayMoiNgay()
        {
            if (!_veMayBayRepository.CapNhatVeMayBayMoiNgay())
            {
                ModelState.AddModelError("", $"Something went wrong when updating the record");
                return StatusCode(500, ModelState);
            }
            return Ok("Cập nhật vé máy bay mới mỗi ngày thành công");
        }

        [HttpPost("ThemPhieuDatCho")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult ThemPhieuDatCho([FromBody] ThemPhieuDatChoDto themPhieuDatChoDto)
        {
            var tenkh = themPhieuDatChoDto.TenKhachHang;
            var sdt = themPhieuDatChoDto.SDT;
            var cmnd = themPhieuDatChoDto.CMND;

            var khachHangTonTai = _context.KhachHangs.FirstOrDefault(kh => kh.CMND == cmnd);

            if (khachHangTonTai == null)
            {
                // Lấy MaKH cao nhất hiện có
                var lastKhachHang = _context.KhachHangs
                                            .OrderByDescending(kh => kh.MaKH)
                                            .FirstOrDefault();

                // Xác định MaKH tiếp theo
                int nextIdNumber = 1;
                if (lastKhachHang != null)
                {
                    var lastId = lastKhachHang.MaKH;
                    nextIdNumber = int.Parse(lastId.Substring(2)) + 1;
                }
                var newMaKH = "KH" + nextIdNumber.ToString("D2");

                var khachHang = new KhachHang
                {
                    MaKH = newMaKH,
                    TenKH = tenkh,
                    SDT = sdt,
                    CMND = cmnd
                };
                _context.KhachHangs.Add(khachHang);
                _context.SaveChanges();
            }else
            {
                if(khachHangTonTai.SDT != sdt)
                {
                    ModelState.AddModelError("", "Số điện thoại không khớp với SDT đã đăng ký");
                    return StatusCode(400, ModelState);
                }
                if (khachHangTonTai.TenKH != tenkh)
                {
                    ModelState.AddModelError("", "Tên khách hàng không khớp với tên đã đăng ký");
                    return StatusCode(400, ModelState);
                }
            }


            if (!_veMayBayRepository.ThemPhieuDatCho(themPhieuDatChoDto))
            {
                ModelState.AddModelError("", "Có lỗi xảy ra khi lưu phiếu đặt chỗ");
                return StatusCode(500, ModelState);
            }

            return Ok("Thêm phiếu đặt chỗ thành công");
        }
    }
}
