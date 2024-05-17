using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IQuyDinhChungRepository
    {
        int GetThoiGianChamNhatDatVe();
        int GetThoiGianHuyDatVe();
        bool UpdateQuyDinhChung(QuyDinhChung quyDinhChung);
        bool QuyDinhChungExists(int id);
        bool Save();
    }
}
