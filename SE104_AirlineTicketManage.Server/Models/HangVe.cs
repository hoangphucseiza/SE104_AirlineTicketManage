using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Models
{
    public class HangVe
    {
        [Key]
        public string MaHV { get; set; }

        public string TenHV { get; set; }

        public double TiLe_Gia { get; set; }
        public ICollection<ChuyenBayHangVe> ChuyenBayHangVes { get; set; }
    }
}
