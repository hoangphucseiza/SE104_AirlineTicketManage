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

        public ICollection<DanhSachChuyenBayDto> Get4ChuyenBay()
        {
            // Lấy ra 4 chuyến bay gần nhất
            var chuyenBays = _context.ChuyenBays.Where(p => p.NgayGio >= DateTime.Today)
                .OrderBy(p => p.NgayGio)
                .Take(4)
                .ToList();
            var danhSachChuyenBayDtos = new List<DanhSachChuyenBayDto>();
            // Lọc qua từng chuyến bay
            foreach(var chuyenBay in chuyenBays)
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
                var chuyenBayDto = new DanhSachChuyenBayDto
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

        public ChuyenBay GetChuyenBay(string maCB)
        {
            return _context.ChuyenBays.Where(p => p.MaCB == maCB).FirstOrDefault();
        }

        public ThongTinChiTietChuyenBayDto GetThongTinChuyenBay(string maCB)
        {
           var chuyenBay = _context.ChuyenBays.Where(p => p.MaCB == maCB).FirstOrDefault();

            // Lấy thông tin của hạng vé
            var danhSachThongTinHangVes = new List<ThongTinChiTietChuyenBay_HangVe>();
            var dshangVe = _context.ChuyenBayHangVes.Where(p => p.MaCB == maCB).ToList();
            foreach (var hangVe in dshangVe)
            {
                var hangVeDto = new ThongTinChiTietChuyenBay_HangVe
                {
                   MaHangVe = hangVe.MaHV,
                   TenHangVe =  _context.HangVes.Where(p => p.MaHV == hangVe.MaHV).FirstOrDefault().TenHV,
                    TiLeGia = _context.HangVes.Where(p => p.MaHV == hangVe.MaHV).FirstOrDefault().TiLe_Gia,
                    TongSoVe = hangVe.SoLuong,
                   SoVeBanDuoc = _context.VeMayBays.Where(p => p.MaCB == maCB && p.MaHV == hangVe.MaHV && p.NgayMua != null).Count()
                };
                danhSachThongTinHangVes.Add(hangVeDto);
            }

            // Lấy thông tin của sân bay dừng
            var danhSachSanBayDungs = new List<ThongTinChiTietChuyenBay_SanBayDung>();
            var dsSanBayDung = _context.SanBayTrungGians.Where(p => p.MaCB == maCB).ToList();
            foreach (var sanBayDung in dsSanBayDung)
            {
                var sanBay = _context.SanBays.Where(p => p.MaSB == sanBayDung.MaSB).FirstOrDefault();
                var sanBayDungDto = new ThongTinChiTietChuyenBay_SanBayDung
                {
                    MaSB = sanBay.MaSB,
                    ViTri = sanBayDung.SanBay.ViTri,
                };
                danhSachSanBayDungs.Add(sanBayDungDto);
            }

            var thongTinChiTietChuyenBay = new ThongTinChiTietChuyenBayDto
            {
                MaChuyenBay = chuyenBay.MaCB,
                NgayGioBay = chuyenBay.NgayGio,
                NgayGioDen = chuyenBay.NgayGio.AddMinutes(chuyenBay.ThoiGianBay),
                ThoiGianBay = chuyenBay.ThoiGianBay,
                GiaVe = chuyenBay.GiaVe,
                SanBayDi = new ThongTinChiTietChuyenBay_SanBayDto
                {
                    MaSB = chuyenBay.MaSB_Di,
                    ViTri = _context.SanBays.Where(p => p.MaSB == chuyenBay.MaSB_Di).FirstOrDefault().ViTri,
                },
                SanBayDen = new ThongTinChiTietChuyenBay_SanBayDto
                {
                    MaSB = chuyenBay.MaSB_Den,
                    ViTri = _context.SanBays.Where(p => p.MaSB == chuyenBay.MaSB_Den).FirstOrDefault().ViTri,
                },
                DanhSachThongTinHangVe = danhSachThongTinHangVes,
                DanhSachSanBayDung = danhSachSanBayDungs,
            };
            return thongTinChiTietChuyenBay;
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

        ICollection<dynamic> IChuyenBayRepository.ThongKeTrangChu()
        {
            var homnay = DateTime.Today;
            var homqua = homnay.AddDays(-1);
            // Khởi tạo các biến của Hành khách
            var valueHanhKhach = _context.VeMayBays.Count(p => p.NgayMua.Value != null && p.NgayMua.Value.Date == homnay);
            var valueHanhKhachHomQua = _context.VeMayBays.Count(p => p.NgayMua.Value != null && p.NgayMua.Value.Date == homqua);
            decimal tiLeTangTruongHanhKhach = 0;
            if (valueHanhKhachHomQua == 0)
            {
                 tiLeTangTruongHanhKhach = 0;
            }else
            {
                 tiLeTangTruongHanhKhach = ((decimal)(valueHanhKhach - valueHanhKhachHomQua) / (decimal)valueHanhKhachHomQua) * 100;
            }    
            
            // Khởi tạo các biến của Chuyến bay
            var valueChuyenBay = _context.ChuyenBays.Count(p => p.NgayGio.Date == homnay);
            var valueChuyenBayHomQua = _context.ChuyenBays.Count(p => p.NgayGio.Date == homqua);
            decimal tiLeTangTruongChuyenBay = 0 ;
            if (valueChuyenBayHomQua == 0)
            {
                 tiLeTangTruongChuyenBay = 0;
            }
            else
            {
                 tiLeTangTruongChuyenBay = (decimal)(valueChuyenBay - valueChuyenBayHomQua) / (decimal)valueChuyenBayHomQua * 100;
            }
            // Khởi tạo các biến của Phiếu Đặt chỗ bị hủy
            var valuePhieuDatChoBiHuy = _context.VeMayBays.Count(p => p.ChuyenBay.NgayGio.Date == homnay && p.NgayMua == null);
            var valuePhieuDatChoBiHuyHomQua = _context.VeMayBays.Count(p => p.ChuyenBay.NgayGio.Date == homqua && p.NgayMua == null);
            decimal tiLeTangTruongPhieuDatChoBiHuy = 0;
            if (valuePhieuDatChoBiHuyHomQua == 0)
            {
                 tiLeTangTruongPhieuDatChoBiHuy = 0;
            }
            else
            {
                 tiLeTangTruongPhieuDatChoBiHuy = (decimal)(valuePhieuDatChoBiHuy - valuePhieuDatChoBiHuyHomQua) / (decimal)valuePhieuDatChoBiHuyHomQua * 100;
            }


            // Khởi tạo các biến của Doanh Thu
            var valueDoanhThu = _context.VeMayBays.Where(p => p.NgayMua >= homnay).Sum(p => p.GiaTien);
            var valueDoanhThuHomQua = _context.VeMayBays.Where(p => p.NgayMua >= homqua && p.NgayMua < homnay).Sum(p => p.GiaTien);

            decimal tiLeTangTruongDoanhThu = 0;
            if (valueDoanhThuHomQua == 0)
            {
                tiLeTangTruongDoanhThu = 0;
            }
            else
            {
                tiLeTangTruongDoanhThu = (valueDoanhThu - valueDoanhThuHomQua) / valueDoanhThuHomQua * 100;
            }

            ICollection<dynamic> thongKe = new List<dynamic>
            {
               
                new
                {
                    title = "Hành khách",
                    value = valueHanhKhach,
                    increase = tiLeTangTruongHanhKhach,
                    date_time = homnay
                },
                new
                {
                    title = "Chuyến bay",
                    value = valueChuyenBay,
                    increase = tiLeTangTruongChuyenBay,
                    date_time = homnay
                },
                new
                {
                    title = "Phiếu Đặt chỗ bị hủy",
                    value = valuePhieuDatChoBiHuy,
                    increase = tiLeTangTruongPhieuDatChoBiHuy,
                    date_time = homnay
                },
                new
                {
                    title = "Doanh thu",
                    value = valueDoanhThu,
                    increase = tiLeTangTruongDoanhThu,
                    date_time = homnay,
                    is_money = true
                }
            };

            return thongKe;
        }
    }
}
