using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IHangVeRepository
    {
        ICollection<HangVe> GetHangVes();
        float GetTiLeHangVe(string maHV);

        bool HangVeExists(string maHV);

        bool Save();
    }
}
