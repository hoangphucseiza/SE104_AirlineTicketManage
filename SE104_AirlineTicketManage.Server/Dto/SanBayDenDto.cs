using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class SanBayDenDto
    {
        public string MaSanBay { get; set; }
        public string TenSanBay { get; set; }
        public int SoSanBayDungToiDa { get; set; }
        public int ThoiGianBayToiThieu { get; set; }
    }
}
