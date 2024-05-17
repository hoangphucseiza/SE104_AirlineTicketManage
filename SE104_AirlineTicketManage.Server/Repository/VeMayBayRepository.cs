using AutoMapper;
using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;
using System;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class VeMayBayRepository : IVeMayBayRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public VeMayBayRepository(DataContext dataContext, IMapper mapper)
        {
            _context = dataContext;
            _mapper = mapper;
        }

        public bool CreateVeMayBay(string maCB, string maKH, string maHV, VeMayBay veMayBay)
        {
            var VeMayBay = new VeMayBay
            {
                MaVe = veMayBay.MaVe,
                MaCB = maCB,
                MaKH = maKH,
                MaHV = maHV,
                GiaTien = veMayBay.GiaTien,
                NgayDat = veMayBay.NgayDat,
                NgayMua = veMayBay.NgayMua,
                TrangThai = "Chưa thanh toán"
            };
            _context.VeMayBays.Add(VeMayBay);
            return Save();

        }

        public bool DeleteVeMayBay(string maVe)
        {
            _context.VeMayBays.Remove(GetVeMayBay(maVe));
            return Save();
        }

        public GetChiTietByMaVeDto GetDetailByMaVe(string maVe)
        {
            var vmb = _context.VeMayBays.Where(p => p.MaVe == maVe).FirstOrDefault();
            var cb = _context.ChuyenBays.Where(p => p.MaCB == vmb.MaCB).FirstOrDefault();
            var kh = _context.KhachHangs.Where(p => p.MaKH == vmb.MaKH).FirstOrDefault();
            var hv = _context.HangVes.Where(p => p.MaHV == vmb.MaHV).FirstOrDefault();

            var sanBay_den = _context.SanBays.Where(p => p.MaSB == cb.MaSB_Den).FirstOrDefault();
            SanBayDto sanBayDen = _mapper.Map<SanBayDto>(sanBay_den);

            var sanBay_di = _context.SanBays.Where(p => p.MaSB == cb.MaSB_Di).FirstOrDefault();
            SanBayDto sanBayDi = _mapper.Map<SanBayDto>(sanBay_di);

            var getChiTietByMaVeDto = new GetChiTietByMaVeDto
            {
                MaVe = vmb.MaVe,
                GiaTien = vmb.GiaTien,
                NgayDat = vmb.NgayDat,
                NgayMua = vmb.NgayMua,
                TrangThai = vmb.TrangThai,
                MaCB = vmb.MaCB,
                SanBayDen = sanBayDen,
                SanBayDi = sanBayDi,
                NgayGioBay = cb.NgayGio,
                NgayGioDen = cb.NgayGio.AddMinutes(cb.ThoiGianBay),
                MaHV = hv.MaHV,
                TenHV = hv.TenHV,
                MaKH = kh.MaKH,
                TenKH = kh.TenKH,
                CMND = kh.CMND,
                SDT = kh.SDT,
            };
            return getChiTietByMaVeDto;
        }

        public VeMayBay GetVeMayBay(string maVe)
        {
            return _context.VeMayBays.Where(p => p.MaVe == maVe).FirstOrDefault();
        }

        public ICollection<VeMayBay> GetVeMayBays()
        {
            return _context.VeMayBays.OrderBy(p => p.MaVe).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool VeMayBayExists(string maVe)
        {
            return _context.VeMayBays.Any(p => p.MaVe == maVe);
        }
    }
}
