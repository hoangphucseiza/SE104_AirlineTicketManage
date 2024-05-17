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

        bool Save();
    }
}
