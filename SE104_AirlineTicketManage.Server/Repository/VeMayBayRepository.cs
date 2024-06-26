﻿using AutoMapper;
using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

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

       
        // Bộ lọc tra cứu vé theo hang ve va loai ve
        public List<TraCuuVeMayBayDto> BoLocHangVe_LoaiVe(List<TraCuuVeMayBayDto> traCuuVeMayBays, string hangve, string loaiVe)
        {
           if(hangve != "All")
            {
                traCuuVeMayBays = traCuuVeMayBays.Where(p => p.maHV == hangve).ToList();
            }

           if (loaiVe != "All")
            {
                string loaiVeLoc = "";
                if (loaiVe == "0")
                {
                    loaiVeLoc = "thanh";
                }
                else if (loaiVe == "1")
                {
                    loaiVeLoc = "mua";
                }
                else if (loaiVe == "2")
                {
                    loaiVeLoc = "hủy";
                }

                traCuuVeMayBays = traCuuVeMayBays.Where(p => p.TrangThai.TrimStart().TrimEnd().ToLower().Contains(loaiVeLoc)).ToList();
            }    
           
           
            return traCuuVeMayBays;
        }

        public ICollection<TraCuuVeMayBayDto> GetVeByMaCB(string? searchMaCB, string hangVe, string loaiVe, int phantrang)
        {
            IQueryable<VeMayBay> veMayBaysQuery = _context.VeMayBays;

            if (!string.IsNullOrEmpty(searchMaCB))
            {
                veMayBaysQuery = veMayBaysQuery.Where(p => p.MaCB.Contains(searchMaCB) || p.MaCB == searchMaCB);
            }

            var veMayBays = veMayBaysQuery.ToList();
            var traCuuVeMayBays = new List<TraCuuVeMayBayDto>();

            foreach (var veMayBay in veMayBays)
            {
                var traCuuVeMayBay = new TraCuuVeMayBayDto();
                traCuuVeMayBay.maVe = veMayBay.MaVe;
                traCuuVeMayBay.maChuyenbay = veMayBay.MaCB;
                traCuuVeMayBay.TenKhachHang = _context.KhachHangs.Where(p => p.MaKH == veMayBay.MaKH).FirstOrDefault().TenKH;
                traCuuVeMayBay.SDT = _context.KhachHangs.Where(p => p.MaKH == veMayBay.MaKH).FirstOrDefault().SDT;
                traCuuVeMayBay.NgayDatVe = veMayBay.NgayDat;
                traCuuVeMayBay.maHV = veMayBay.MaHV;
                traCuuVeMayBay.HangVe = _context.HangVes.Where(p => p.MaHV == veMayBay.MaHV).FirstOrDefault().TenHV;
                traCuuVeMayBay.TrangThai = veMayBay.TrangThai;

                traCuuVeMayBays.Add(traCuuVeMayBay);
            }

            traCuuVeMayBays = BoLocHangVe_LoaiVe(traCuuVeMayBays, hangVe, loaiVe);
            traCuuVeMayBays = traCuuVeMayBays.Skip((phantrang - 1) * 10).Take(10).ToList();
            return traCuuVeMayBays;

        }

        public ICollection<TraCuuVeMayBayDto> GetVeByMaVe(string? searchMaVe, string hangVe, string loaiVe, int phantrang)
        {
            var traCuuVeMayBays = new List<TraCuuVeMayBayDto>();
            // Nếu như search trống, thì lấy tất cả
            if (string.IsNullOrEmpty(searchMaVe))
            {
                var veMayBays = _context.VeMayBays.ToList();
                foreach (var veMayBay in veMayBays)
                {
                    var traCuuVeMayBay = new TraCuuVeMayBayDto();
                    traCuuVeMayBay.maVe = veMayBay.MaVe;
                    traCuuVeMayBay.maChuyenbay = veMayBay.MaCB;
                    traCuuVeMayBay.TenKhachHang = _context.KhachHangs.Where(p => p.MaKH == veMayBay.MaKH).FirstOrDefault().TenKH;
                    traCuuVeMayBay.SDT = _context.KhachHangs.Where(p => p.MaKH == veMayBay.MaKH).FirstOrDefault().SDT;
                    traCuuVeMayBay.NgayDatVe = veMayBay.NgayDat;
                    traCuuVeMayBay.maHV = veMayBay.MaHV;
                    traCuuVeMayBay.HangVe = _context.HangVes.Where(p => p.MaHV == veMayBay.MaHV).FirstOrDefault().TenHV;
                    traCuuVeMayBay.TrangThai = veMayBay.TrangThai;

                    traCuuVeMayBays.Add(traCuuVeMayBay);
                }
            }
            else // Ngược lại thì lấy danh sách những vé có từ chứa đó
            {
                var veMayBays = _context.VeMayBays.Where(p => p.MaVe.Contains(searchMaVe) || p.MaVe == searchMaVe).ToList();
                foreach (var veMayBay in veMayBays)
                {
                    var traCuuVeMayBay = new TraCuuVeMayBayDto();
                    traCuuVeMayBay.maVe = veMayBay.MaVe;
                    traCuuVeMayBay.maChuyenbay = veMayBay.MaCB;
                    traCuuVeMayBay.TenKhachHang = _context.KhachHangs.Where(p => p.MaKH == veMayBay.MaKH).FirstOrDefault().TenKH;
                    traCuuVeMayBay.SDT = _context.KhachHangs.Where(p => p.MaKH == veMayBay.MaKH).FirstOrDefault().SDT;
                    traCuuVeMayBay.NgayDatVe = veMayBay.NgayDat;
                    traCuuVeMayBay.maHV = veMayBay.MaHV;
                    traCuuVeMayBay.HangVe = _context.HangVes.Where(p => p.MaHV == veMayBay.MaHV).FirstOrDefault().TenHV;
                    traCuuVeMayBay.TrangThai = veMayBay.TrangThai;

                    traCuuVeMayBays.Add(traCuuVeMayBay);
                }

            }
            traCuuVeMayBays = BoLocHangVe_LoaiVe(traCuuVeMayBays, hangVe, loaiVe);
            traCuuVeMayBays = traCuuVeMayBays.Skip((phantrang - 1) * 10).Take(10).ToList();
            return traCuuVeMayBays;
        }

        public ICollection<TraCuuVeMayBayDto> GetVeBySDT(string? searchSDT, string hangVe, string loaiVe, int phantrang)
        {
            IQueryable<VeMayBay> veMayBaysQuery = _context.VeMayBays;

            if (!string.IsNullOrEmpty(searchSDT))
            {
                veMayBaysQuery = veMayBaysQuery.Where(p =>  p.KhachHang.SDT.Contains(searchSDT));
            }

            var veMayBays = veMayBaysQuery.ToList();
            var traCuuVeMayBays = new List<TraCuuVeMayBayDto>();

            foreach (var veMayBay in veMayBays)
            {
                var traCuuVeMayBay = new TraCuuVeMayBayDto();
                traCuuVeMayBay.maVe = veMayBay.MaVe;
                traCuuVeMayBay.maChuyenbay = veMayBay.MaCB;
                traCuuVeMayBay.TenKhachHang = _context.KhachHangs.Where(p => p.MaKH == veMayBay.MaKH).FirstOrDefault().TenKH;
                traCuuVeMayBay.SDT = _context.KhachHangs.Where(p => p.MaKH == veMayBay.MaKH).FirstOrDefault().SDT;
                traCuuVeMayBay.NgayDatVe = veMayBay.NgayDat;
                traCuuVeMayBay.maHV = veMayBay.MaHV;
                traCuuVeMayBay.HangVe = _context.HangVes.Where(p => p.MaHV == veMayBay.MaHV).FirstOrDefault().TenHV;
                traCuuVeMayBay.TrangThai = veMayBay.TrangThai;

                traCuuVeMayBays.Add(traCuuVeMayBay);
            }

            traCuuVeMayBays = BoLocHangVe_LoaiVe(traCuuVeMayBays, hangVe, loaiVe);
            traCuuVeMayBays = traCuuVeMayBays.Skip((phantrang - 1) * 10).Take(10).ToList();
            return traCuuVeMayBays;
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

        public bool CapNhatTrangThaiVe(string maVe, string TrangThai, DateTime NgayMua)
        {
            if (TrangThai == "Đã mua")
            {
                var veMayBay = GetVeMayBay(maVe);
                veMayBay.TrangThai = TrangThai;
                veMayBay.NgayMua = NgayMua;
                return Save();
            }
            else
            {
                var veMayBay = GetVeMayBay(maVe);
                veMayBay.TrangThai = TrangThai;
                return Save();
            }

        }

        public bool CapNhatVeMayBayMoiNgay()
        {
            int? thoiGianHuyVe = _context.QuyDinhChungs.Select(p => p.ThoiGianHuyDatVe).FirstOrDefault();

            string chuaThanhToan = "thanh";

            var veMayBays = _context.VeMayBays.Where(p => p.TrangThai.TrimStart().TrimEnd().ToLower().Contains(chuaThanhToan)).ToList();
            foreach (var veMayBay in veMayBays)
            {
                var soNgayTruoc = (DateTime.Today - veMayBay.NgayDat).Days;
                if (soNgayTruoc <= thoiGianHuyVe)
                {
                    veMayBay.TrangThai = "Đã hủy";
                }
            }

            _context.SaveChanges();
            return true;
        }

        public bool ThemPhieuDatCho(ThemPhieuDatChoDto themPhieuDatChoDto)
        {
            // Lấy MaVe cao nhất hiện có
            var lastVe = _context.VeMayBays
                                        .OrderByDescending(p => p.MaVe)
                                        .FirstOrDefault();

            // Xác định MaVe tiếp theo
            int nextIdNumber = 1;
            if (lastVe != null)
            {
                var lastId = lastVe.MaVe;
                nextIdNumber = int.Parse(lastId.Substring(3)) + 1;
            }
            var newVe = "VMB" + nextIdNumber.ToString("D2");
            var veMayBay = new VeMayBay
            {
                MaVe = newVe,
                MaCB = themPhieuDatChoDto.MaCB,
                MaKH = _context.KhachHangs.FirstOrDefault(p => p.CMND == themPhieuDatChoDto.CMND).MaKH,
                GiaTien = themPhieuDatChoDto.GiaTien,
                MaHV = themPhieuDatChoDto.MaHangVe,
                NgayDat = themPhieuDatChoDto.NgayDat,
                NgayMua = themPhieuDatChoDto.NgayMua,
                TrangThai = themPhieuDatChoDto.TrangThaiVe == 1 ? "Đã mua" : "Chưa thanh toán"
            };

            _context.VeMayBays.Add(veMayBay);
            _context.SaveChanges();

            return true;
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
    }
}
