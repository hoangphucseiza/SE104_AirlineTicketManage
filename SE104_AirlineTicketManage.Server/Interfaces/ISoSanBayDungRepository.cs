namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface ISoSanBayDungRepository
    {
        bool SoSanBayDungExists(string maSBDi, string maSBDen);
        int GetSoSBDungToiDa(string maSBDi, string maSBDen);

        bool Save();
    }
}
