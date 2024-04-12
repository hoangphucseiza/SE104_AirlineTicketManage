using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Models
{
    public class VeMayBay
    {
        [Key]
        public string MaVe { get; set; }

        public ChuyenBay ChuyenBay { get; set; }


        public KhachHang KhachHang { get; set; }

        public HangVe HangVe { get; set; }

        public decimal GiaTien { get; set; }

        public DateTime NgayDat { get; set; }

        public DateTime NgayMua { get; set; }

        public string TrangThai { get; set; }
    }
}
