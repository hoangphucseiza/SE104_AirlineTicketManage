using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;
using SE104_AirlineTicketManage.Server.Repository;
using System;

namespace SE104_AirlineTicketManage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : Controller
    {
        private readonly IKhachHangRepository _khachHangRepository;
        private readonly IMapper _mapper;

        public KhachHangController(IKhachHangRepository khachHangRepository, IMapper mapper)
        {
            _khachHangRepository = khachHangRepository;
            _mapper = mapper;
        }

        [HttpGet("GetDanhSachKhachHang")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<KhachHang>))]
        [ProducesResponseType(400)]
        public IActionResult GetKhachHangs()
        {
            var khachHangs = _mapper.Map<List<KhachHangDto>>(_khachHangRepository.GetKhachHangs());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(khachHangs);
        }

        [HttpGet("GetKhachHangByMaKH/{maKH}")]
        [ProducesResponseType(200, Type = typeof(KhachHang))]
        [ProducesResponseType(400)]
        public IActionResult GetKhachHangByMaKH(string maKH)
        {
            if (!_khachHangRepository.KhachHangExists(maKH))
                return NotFound();

            var khachHang = _mapper.Map<KhachHangDto>(_khachHangRepository.GetKhachHangByMaKH(maKH));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(khachHang);
        }

        [HttpGet("GetKhachHangBySDT/{sdt}")]
        [ProducesResponseType(200, Type = typeof(KhachHang))]
        [ProducesResponseType(400)]
        public IActionResult GetKhachHangBySDT(string sdt)
        {
            if (!_khachHangRepository.KhachHangSDTExists(sdt))
                return NotFound();

            var khachHang = _mapper.Map<KhachHangDto>(_khachHangRepository.GetKhachHangBySDT(sdt));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(khachHang);
        }

        [HttpGet("GetKhachHangByCCCD/{cccd}")]
        [ProducesResponseType(200, Type = typeof(KhachHang))]
        [ProducesResponseType(400)]
        public IActionResult GetKhachHangByCCCD(string cccd)
        {
            if (!_khachHangRepository.KhachHangCCCDExists(cccd))
                return NotFound();

            var khachHang = _mapper.Map<KhachHangDto>(_khachHangRepository.GetKhachHangByCCCD(cccd));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(khachHang);
        }

        [HttpGet("GetKhachHangDetail/{maKH}")]
        [ProducesResponseType(200, Type = typeof(GetDetailKhachHangDto))]
        [ProducesResponseType(400)]
        public IActionResult GetKhachHangDetail(string maKH)
        {
            if (!_khachHangRepository.KhachHangExists(maKH))
                return NotFound();

            var khachHang = _mapper.Map<GetDetailKhachHangDto>(_khachHangRepository.GetKhachHangDetail(maKH));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(khachHang);
        }

        [HttpGet("GetDanhSachKhachHang{phantrang}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<KhachHang>))]
        [ProducesResponseType(400)]
        public IActionResult GetDanhSachKhachHangs(int phantrang)
        {
            var khachHangs = _mapper.Map<List<KhachHangDto>>(_khachHangRepository.GetDanhSachKhachHang(phantrang));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(khachHangs);
        }
    }
}
