using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IVeMayBayRepository
    {
        ICollection<VeMayBay> GetVeMayBays();
        VeMayBay GetVeMayBay(string maVe);

        ICollection<BaoCaoDoanhTheoThangDto> DoanhThuTheoThang(int thang, int nam);

        ICollection<BaoCaoDoanhTheoNamDto> DoanhThuTheoNam(int nam);

        ICollection<TraCuuVeMayBayDto> GetVeByMaVe(string? searchMaVe, string hangVe, string loaiVe, int phantrang);

        ICollection<TraCuuVeMayBayDto> GetVeByMaCB(string? searchMaCB, string hangVe, string loaiVe, int phantrang);
        ICollection<TraCuuVeMayBayDto> GetVeBySDT(string? searchSDT, string hangVe, string loaiVe, int phantrang);


        bool CapNhatVeMayBayMoiNgay();
        bool CapNhatTrangThaiVe(string maVe, string TrangThai, DateTime NgayMua);

        bool VeMayBayExists(string maVe);

        bool CreateVeMayBay(string maCB, string maKH, string maHV ,VeMayBay veMayBay);

        bool DeleteVeMayBay(string maVe);

        bool ThemPhieuDatCho(ThemPhieuDatChoDto themPhieuDatChoDto);

        bool Save();
    }
}
