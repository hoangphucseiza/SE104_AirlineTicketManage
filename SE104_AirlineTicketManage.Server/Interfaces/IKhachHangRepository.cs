using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IKhachHangRepository
    {
        ICollection<KhachHang> GetKhachHangs();
        KhachHang GetKhachHang(string maKH);

        bool KhachHangExists(string maKH);

        bool CreateKhachHang();
        bool Save();
    }
}
