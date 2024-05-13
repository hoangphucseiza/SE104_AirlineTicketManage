using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class HangVeDto
    {
        [Key]
        public string MaHV { get; set; }

        public string TenHV { get; set; }

        public double TiLe_Gia { get; set; }
    }
}
