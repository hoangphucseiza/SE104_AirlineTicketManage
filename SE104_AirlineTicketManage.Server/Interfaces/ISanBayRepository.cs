using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface ISanBayRepository
    {
        ICollection<SanBay> GetSanBays();
        SanBay GetSanBay(string maSB);

        bool SanbayExists(string maSB);

        bool CreateSanBay(SanBay sanBay);

        bool UpdateSanBay(SanBay sanBay); 

        bool Save();
    }
}
