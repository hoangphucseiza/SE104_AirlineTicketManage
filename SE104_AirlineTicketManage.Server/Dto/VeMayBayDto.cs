using SE104_AirlineTicketManage.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class VeMayBayDto
    {
        [Key]
        public string MaVe { get; set; }


        public decimal GiaTien { get; set; }

        public DateTime NgayDat { get; set; }

        public DateTime NgayMua { get; set; }

        public string TrangThai { get; set; }
    }
}
