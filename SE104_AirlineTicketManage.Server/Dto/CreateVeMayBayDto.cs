using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class CreateVeMayBayDto
    {
        [Key]
        public string MaVe { get; set; }


        public decimal GiaTien { get; set; }

        public DateTime NgayDat { get; set; }

        public DateTime? NgayMua { get; set; }
    }
}
