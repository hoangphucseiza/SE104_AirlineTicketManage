using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SE104_AirlineTicketManage.Server.Models
{
    public class ChuyenBay
    {
        [Key]
        public string MaCB { get; set; }
        public DateTime NgayGio { get; set; }
        public int ThoiGianBay { get; set; }
        public decimal GiaVe { get; set; }
       
        public SanBay SanBay_Di { get; set; }

        public SanBay SanBay_Den { get; set; }

        public ICollection<SanBayTrungGian> SanBayTrungGians { get; set; }

        public ICollection<ChuyenBayHangVe> ChuyenBayHangVes { get; set; }
    }
}
