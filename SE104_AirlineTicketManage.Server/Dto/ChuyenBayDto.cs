using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class ChuyenBayDto
    {
        [Key]
        public string MaCB { get; set; }
        public DateTime NgayGio { get; set; }
        public int ThoiGianBay { get; set; }
        public decimal GiaVe { get; set; }

        public string MaSB_Di { get; set; }

        public string MaSB_Den { get; set; }
    }
}
