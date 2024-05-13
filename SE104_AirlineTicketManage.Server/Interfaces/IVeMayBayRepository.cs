using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IVeMayBayRepository
    {
        ICollection<VeMayBay> GetVeMayBays();
        VeMayBay GetVeMayBay(string maVe);

        bool VeMayBayExists(string maVe);

        bool CreateVeMayBay(string maCB, string maKH, string maHV ,VeMayBay veMayBay);

        bool DeleteVeMayBay(string maVe);

        bool Save();
    }
}
