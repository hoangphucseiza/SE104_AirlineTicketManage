using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IChuyenBayRepository
    {
        ICollection<DanhSachChuyenBayDto> Get4ChuyenBay();
        ChuyenBay GetChuyenBay(string maCB);

        ICollection<VeMayBay> GetVeMayBayFromChuyenBay(string maCB);

        bool ChuyenBayExists(string maCB);

        ICollection<dynamic>  ThongKeTrangChu();

        ThongTinChiTietChuyenBayDto  GetThongTinChuyenBay(string maCB);
        ICollection<GetDanhSachChuyenBayDto> GetDanhSachChuyenBay();

        ICollection<GetDanhSachChuyenBayDto> TimKiemChuyenBay(string? maSBDi, string? maSBDen, DateTime? NgayKhoiHanh, int phantrang, string? searchMaCB);

       ThongTinChiTietLichChuyenBayDto GetLichChuyenBayByMaCB(string maCB);

        bool UpdateLichChuyenBay(ThemLichChuyenBayDto updateChuyenBay);

        bool CreateLichChuyenBay(ThemLichChuyenBayDto_1 themChuyenBay);
        bool Save();
    }
}
