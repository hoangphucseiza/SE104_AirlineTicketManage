using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IChuyenBayRepository
    {
        ICollection<ChuyenBay> GetChuyenBays();
        ChuyenBay GetChuyenBay(string maCB);

        bool ChuyenBayExists(string maCB);
    }
}
