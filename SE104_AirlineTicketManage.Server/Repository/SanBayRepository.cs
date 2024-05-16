using Microsoft.AspNetCore.Http.HttpResults;
using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class SanBayRepository : ISanBayRepository
    {
        private readonly DataContext _context;
        public SanBayRepository(DataContext context)
        {
            _context = context;
        }
        public ICollection<SanBay> GetSanBays()
        {
           return _context.SanBays.OrderBy(p => p.MaSB).ToList();
        }

        public bool SanbayExists(string maSB)
        {
            return _context.SanBays.Any(p => p.MaSB == maSB);
        }


        public bool CreateSanBay(SanBay sanBay)
        {
            _context.Add(sanBay);

            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved >= 0 ? true : false;
        }

        public bool UpdateSanBay(SanBay sanBay)
        {
            _context.Update(sanBay);
            return Save();
        }

        public SanBay GetSanBayByMaSB(string maSB)
        {
            return _context.SanBays.Where(p => p.MaSB == maSB).FirstOrDefault();
        }

        public ICollection<SanBay> GetDanhSachSanBay(int phantrang)
        {
            int pageSize = (phantrang -1 ) * 10;

            return _context.SanBays.OrderBy(p => p.MaSB).Skip(pageSize).Take(10).ToList();
        }

        public ICollection<SanBay> GetSanBayByTGDungToiDa(int thoigiandung, int phantrang)
        {
            var sanBays = _context.SanBays.Where(p => p.TGDungMax <= thoigiandung)
                .OrderBy(p => p.MaSB)
                .Skip((phantrang - 1) * 10)
                .Take(10)
                .ToList();
            return sanBays;
        }

        public ICollection<SanBay> GetSanBayByTGDungToiThieu(int thoigiandung, int phantrang)
        {
            var sanBays = _context.SanBays.Where(p => p.TGDungMin >= thoigiandung)
                .OrderBy(p => p.MaSB)
                .Skip((phantrang - 1) * 10)
                .Take(10)
                .ToList();
            return sanBays;
        }

        public ICollection<SanBay> GetSanBayByTGDung(int dungtoithieu, int dungtoida, int phantrang)
        {
            var sanBays = _context.SanBays.Where(p => p.TGDungMin >= dungtoithieu && p.TGDungMax <= dungtoida)
              .OrderBy(p => p.MaSB)
              .Skip((phantrang - 1) * 10)
              .Take(10)
              .ToList();
            return sanBays;
        }

        public UpdateSanBayDto GetUpdateSanBay(string maSBdi)
        {
            var updateSanBayDto = new UpdateSanBayDto();
            var sanBayDenDtos = new List<SanBayDenDto>();

            // Lấy thông tin sân bay đi
            var sanBay = GetSanBayByMaSB(maSBdi);
            
            // Gán thông tin sân bay đi
            updateSanBayDto.MaSanBay = sanBay.MaSB;
            updateSanBayDto.TenSanBay = sanBay.TenSB;
            updateSanBayDto.ThoiGianDungMin = sanBay.TGDungMin;
            updateSanBayDto.ThoiGianDungMax = sanBay.TGDungMax;
            updateSanBayDto.ViTri = sanBay.ViTri;

            // Lấy danh sách sân bay đến
            var sanBayDung = _context.SoSanBayDungs.Where(p => p.MaSanBayDi == maSBdi).ToList();
            foreach (var sanbaydung in sanBayDung)
            {
                var sanBayDen = new SanBayDenDto();
                sanBayDen.MaSanBay = sanbaydung.MaSanBayDen;
                sanBayDen.TenSanBay = GetSanBayByMaSB(sanbaydung.MaSanBayDen).TenSB;
                sanBayDen.SoSanBayDungToiDa = sanbaydung.SoSBDung_Max;
                sanBayDen.ThoiGianBayToiThieu = sanbaydung.ThoiGianBayToiThieu;
                sanBayDenDtos.Add(sanBayDen);
            }
            updateSanBayDto.SanBayDens = sanBayDenDtos;

            return updateSanBayDto;
        }

        public bool CreateSanBay(UpdateSanBayDto sanbaymoi)
        {
            // Thêm sân bay đi
            SanBay sanbaydi = new SanBay();
            sanbaydi.MaSB = sanbaymoi.MaSanBay;
            sanbaydi.TenSB = sanbaymoi.TenSanBay;
            sanbaydi.TGDungMin = sanbaymoi.ThoiGianDungMin;
            sanbaydi.TGDungMax = sanbaymoi.ThoiGianDungMax;
            sanbaydi.ViTri = sanbaymoi.ViTri;

            _context.SanBays.Add(sanbaydi);

            // Tạo sân bay dừng từ sân bay đến
            var sanBayDens = sanbaymoi.SanBayDens;

            foreach(var sanBayDen in sanBayDens)
            {
                var sanBayDung = new SoSanBayDung();
                sanBayDung.MaSanBayDi = sanbaymoi.MaSanBay;
                sanBayDung.MaSanBayDen = sanBayDen.MaSanBay;
                sanBayDung.SoSBDung_Max = sanBayDen.SoSanBayDungToiDa;
                sanBayDung.ThoiGianBayToiThieu = sanBayDen.ThoiGianBayToiThieu;

                _context.SoSanBayDungs.Add(sanBayDung);
                _context.SaveChanges();
            }
            return true;
        }

        public bool UpdateSanBay(UpdateSanBayDto updateSanBay)
        {
            // Cập nhật giá trị sân bay đến
            var sanBay = new SanBay();
            sanBay.MaSB = updateSanBay.MaSanBay;
            sanBay.TenSB = updateSanBay.TenSanBay;
            sanBay.TGDungMin = updateSanBay.ThoiGianDungMin;
            sanBay.TGDungMax = updateSanBay.ThoiGianDungMax;
            sanBay.ViTri = updateSanBay.ViTri;
            _context.SanBays.Update(sanBay);
            _context.SaveChanges();

            // Lấy danh sách sân bay dừng và cập nhật thêm xóa sửa
            var sanBayDenLucSaus = updateSanBay.SanBayDens;
            var SanBayDenLucDaus = GetUpdateSanBay(updateSanBay.MaSanBay).SanBayDens;

            // Duyệt qua từng phần tử lúc đầu, so sánh với mảng lúc sau, nếu không tìm thấy => Xóa
            foreach (var sanBayDenLucDau in SanBayDenLucDaus)
            {
                if (!sanBayDenLucSaus.Any(p => p.MaSanBay == sanBayDenLucDau.MaSanBay))
                {
                    var SanBayXoa = _context.SoSanBayDungs.Where(p => p.MaSanBayDi == updateSanBay.MaSanBay && p.MaSanBayDen == sanBayDenLucDau.MaSanBay).FirstOrDefault();

                    if (SanBayXoa != null)
                    {
                        SanBayXoa.SoSBDung_Max = sanBayDenLucDau.SoSanBayDungToiDa;
                        SanBayXoa.ThoiGianBayToiThieu = sanBayDenLucDau.ThoiGianBayToiThieu;

                        _context.SoSanBayDungs.Remove(SanBayXoa);
                        _context.SaveChanges();
                    }    
                   
                }
            }

            // Duyệt qua từng phần tử lúc sau, so sánh với mảng lúc đầu, nếu không tìm thấy => Thêm, Ngược lại Update toàn bộ
            foreach (var sanBayDenLucSau in sanBayDenLucSaus)
            {
                // Thêm sân bay dừng mới nếu phát hiện sân bay dừng mới
                if (SanBayDenLucDaus.Any(p => p.MaSanBay == sanBayDenLucSau.MaSanBay) == false)
                {
                    var sanBayDung = new SoSanBayDung();
                    sanBayDung.MaSanBayDi = updateSanBay.MaSanBay;
                    sanBayDung.MaSanBayDen = sanBayDenLucSau.MaSanBay;
                    sanBayDung.SoSBDung_Max = sanBayDenLucSau.SoSanBayDungToiDa;
                    sanBayDung.ThoiGianBayToiThieu = sanBayDenLucSau.ThoiGianBayToiThieu;

                    _context.SoSanBayDungs.Add(sanBayDung);
                    _context.SaveChanges();
                }
                else if (SanBayDenLucDaus.Any(p => p.MaSanBay == sanBayDenLucSau.MaSanBay) == true)
                {
                   var sanBaySua = _context.SoSanBayDungs.Where(p => p.MaSanBayDi == updateSanBay.MaSanBay && p.MaSanBayDen == sanBayDenLucSau.MaSanBay).FirstOrDefault();

                    if (sanBaySua != null)
                    {
                        sanBaySua.SoSBDung_Max = sanBayDenLucSau.SoSanBayDungToiDa;
                        sanBaySua.ThoiGianBayToiThieu = sanBayDenLucSau.ThoiGianBayToiThieu;
                        _context.SoSanBayDungs.Update(sanBaySua);
                        _context.SaveChanges();
                    }
                    
                }
            }
          
            return true;
        }

        public ICollection<SanBay> GetSanBayBySearch(string search)
        {
            var sanBays = _context.SanBays.Where(p => p.MaSB.Contains(search)).ToList();
            return sanBays;
        }
    }
}
