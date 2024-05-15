using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IHangVeRepository
    {
        ICollection<HangVe> GetHangVes();
        ICollection<HangVe> GetDanhSachHangVe();
        HangVe GetDanhSachHangVe(string MaHV);

        bool CreateHangVe(HangVe hangVe);

        bool UpdateHangVe(HangVe hangVe);

        float GetTiLeHangVe(string maHV);

        bool HangVeExists(string maHV);

        bool Save();
    }
}
