using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class VeMayBayRepository : IVeMayBayRepository
    {
        private readonly DataContext _context;
        public VeMayBayRepository(DataContext dataContext)
        {
            _context = dataContext;
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

        public ICollection<BaoCaoDoanhTheoNamDto> DoanhThuTheoNam(int nam)
        {
            var doanhThuNam = _context.VeMayBays.Where(p => p.NgayMua.HasValue && p.NgayMua.Value.Year == nam).Sum(p => p.GiaTien);
            var thangHienTai = 0;
           if (nam == DateTime.Today.Year)
            {
                 thangHienTai = DateTime.Today.Month;
            }
            else
            {
                thangHienTai = 12;
            }
            var baoCaoDoanhThuNams = new List<BaoCaoDoanhTheoNamDto>();
            for (int i = 1; i <= thangHienTai; i++)
            {
                var tongsoChuyenBay = _context.ChuyenBays.Where(p => p.NgayGio.Month == i && p.NgayGio.Year == nam).Count();
                var doanhThu = _context.VeMayBays.Where(p => p.NgayMua.HasValue && p.NgayMua.Value.Month == i && p.NgayMua.Value.Year == nam).Sum(p => p.GiaTien);
                var baoCaoDoanhThuNam = new BaoCaoDoanhTheoNamDto()
                {
                    thang = i,
                    SoChuyenBayKhoiHanh = tongsoChuyenBay,
                    DoanhThu = doanhThu,
                    TyLe = doanhThuNam == 0 ? 0 : (doanhThu / doanhThuNam) * 100

                };
                baoCaoDoanhThuNams.Add(baoCaoDoanhThuNam);
            }
            return baoCaoDoanhThuNams;
        }

        public ICollection<BaoCaoDoanhTheoThangDto> DoanhThuTheoThang(int thang, int nam)
        {
            // Lấy tất cả chuyến bay trong tháng và năm cụ thể
            var chuyenbays = _context.ChuyenBays
                .Where(p => p.NgayGio.Month == thang && p.NgayGio.Year == nam)
                .ToList();

            // Tính tổng doanh thu trong tháng
            var doanhThuCaThang = _context.VeMayBays
                .Where(p => p.NgayMua.HasValue && p.NgayMua.Value.Month == thang && p.NgayMua.Value.Year == nam)
                .Sum(p => p.GiaTien);

            var baoCaoDoanhThuThangDtos = new List<BaoCaoDoanhTheoThangDto>();

            // Lấy tất cả vé máy bay trong tháng và năm cụ thể để xử lý trong bộ nhớ
            var veMayBaysTrongThang = _context.VeMayBays
                .Where(p => p.NgayMua.HasValue && p.NgayMua.Value.Month == thang && p.NgayMua.Value.Year == nam)
                .ToList();

            foreach (var chuyenbay in chuyenbays)
            {
                var tongSoVe = _context.ChuyenBayHangVes
                    .Where(p => p.MaCB == chuyenbay.MaCB)
                    .Sum(p => p.SoLuong);

                var veBanDuoc = veMayBaysTrongThang
                    .Where(p => p.MaCB == chuyenbay.MaCB)
                    .ToList();

                var tongSoVeBanDuoc = veBanDuoc.Count();

                var doanhThu = veBanDuoc.Sum(p => p.GiaTien);

                var phanTram = doanhThuCaThang == 0 ? 0 : (doanhThu / doanhThuCaThang) * 100;

                var baoCaoDoanhThuThangDto = new BaoCaoDoanhTheoThangDto()
                {
                    MaCB = chuyenbay.MaCB,
                    TongSoVe = tongSoVe,
                    TongSoVeBanDuoc = tongSoVeBanDuoc,
                    DoanhThu = doanhThu,
                    PhanTram = phanTram
                };

                baoCaoDoanhThuThangDtos.Add(baoCaoDoanhThuThangDto);
            }

            return baoCaoDoanhThuThangDtos;
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
