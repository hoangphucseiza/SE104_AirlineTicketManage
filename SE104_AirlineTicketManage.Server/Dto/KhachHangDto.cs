using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class KhachHangDto
    {
        [Key]
        public string MaKH { get; set; }
        public string TenKH { get; set; }
        public string CMND { get; set; }
        public string SDT { get; set; }
    }
}
