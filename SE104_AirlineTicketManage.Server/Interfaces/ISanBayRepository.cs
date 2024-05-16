using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface ISanBayRepository
    {
        ICollection<SanBay> GetDanhSachSanBay(int phantrang);

        ICollection<SanBay> GetSanBayByTGDungToiDa(int thoigiandung, int phantrang);

        ICollection<SanBay> GetSanBayByTGDungToiThieu(int thoigiandung, int phantrang);

        ICollection<SanBay> GetSanBayByTGDung(int dungtoithieu, int dungtoida, int phantrang);

        UpdateSanBayDto GetUpdateSanBay(string maSB);

        bool CreateSanBay(UpdateSanBayDto sanbay);

        bool UpdateSanBay(UpdateSanBayDto sanbay);

        SanBay GetSanBayByMaSB(string maSB);


        bool SanbayExists(string maSB);

        bool CreateSanBay(SanBay sanBay);

        bool UpdateSanBay(SanBay sanBay); 

        bool Save();
    }
}
