using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IHangVeRepository
    {
        ICollection<HangVe> GetHangVes();
        float GetTiLeHangVe(string maHV);

        HangVe GetDanhSachHangVe(string MaHV);
        ICollection<HangVe> GetDanhSachHangVe();
        bool CreateHangVe(HangVe hangVe);

        bool UpdateHangVe(HangVe hangVe);

        bool Save();
    }
}
