namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IQuyDinhChungRepository
    {
        int GetThoiGianChamNhatDatVe();
        int GetThoiGianHuyDatVe();

        bool Save();
    }
}
