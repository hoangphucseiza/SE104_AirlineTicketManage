using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IQuyDinhChungRepository
    {
        int GetThoiGianChamNhatDatVe();
        int GetThoiGianHuyDatVe();
        bool UpdateThoiGianChamNhatDatVe(int tgChamNhatDatVe);
        bool UpdateThoiGianHuytDatVe(int tgHuyDatVe);
        bool QuyDinhChungExists(int id);
        bool Save();
    }
}
