using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IChuyenBayRepository
    {
        ICollection<ChuyenBay> GetChuyenBays();
        ChuyenBay GetChuyenBay(string maCB);

        ICollection<VeMayBay> GetVeMayBayFromChuyenBay(string maCB);
        ICollection<GetDanhSachChuyenBayDto> GetDanhSachChuyenBay();

        bool ChuyenBayExists(string maCB);
        bool Save();
    }
}
