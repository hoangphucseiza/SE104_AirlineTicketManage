using AutoMapper;
using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;
using System;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class ChuyenBayRepository : IChuyenBayRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ChuyenBayRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool ChuyenBayExists(string maCB)
        {
            return _context.ChuyenBays.Any(p => p.MaCB == maCB);
        }

        public ChuyenBay GetChuyenBay(string maCB)
        {
            return _context.ChuyenBays.Where(p => p.MaCB == maCB).FirstOrDefault();
        }

        public ICollection<ChuyenBay> GetChuyenBays()
        {
            return _context.ChuyenBays.OrderBy(p => p.MaCB).ToList();
        }

        public ICollection<GetDanhSachChuyenBayDto> GetDanhSachChuyenBay()
        {
            var chuyenBays = _context.ChuyenBays.OrderBy(p => p.NgayGio).ToList();
            var danhSachChuyenBayDtos = new List<GetDanhSachChuyenBayDto>();
            // Lọc qua từng chuyến bay
            foreach (var chuyenBay in chuyenBays)
            {
                // Tính tổng số vé
                int tongSoVe = _context.ChuyenBayHangVes
                                    .Where(p => p.MaCB == chuyenBay.MaCB)
                                    .Sum(p => p.SoLuong);
                // Tính tổng số vé đã bán
                int soVeMua = _context.VeMayBays
                                    .Where(p => p.MaCB == chuyenBay.MaCB && p.NgayMua != null)
                                    .Count();
                // Lấy thông tin Sân Bay Đến
                var sanBay_den = _context.SanBays.Where(p => p.MaSB == chuyenBay.MaSB_Den).FirstOrDefault();
                SanBayDto sanBayDen = _mapper.Map<SanBayDto>(sanBay_den);
                // Lấy thông tin Sân Bay Đi
                var sanBay_di = _context.SanBays.Where(p => p.MaSB == chuyenBay.MaSB_Di).FirstOrDefault();
                SanBayDto sanBayDi = _mapper.Map<SanBayDto>(sanBay_di);
                var chuyenBayDto = new GetDanhSachChuyenBayDto
                {
                    MaCB = chuyenBay.MaCB,
                    SanBayDen = sanBayDen,
                    SanBayDi = sanBayDi,
                    NgayGioBay = chuyenBay.NgayGio,
                    NgayGioDen = chuyenBay.NgayGio.AddMinutes(chuyenBay.ThoiGianBay),
                    TongSoVe = tongSoVe,
                    SoVeMua = soVeMua,
                };
                danhSachChuyenBayDtos.Add(chuyenBayDto);
            }
            return danhSachChuyenBayDtos;
        }

        public ICollection<VeMayBay> GetVeMayBayFromChuyenBay(string maCB)
        {
            return _context.VeMayBays.Where(p => p.MaCB == maCB).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
