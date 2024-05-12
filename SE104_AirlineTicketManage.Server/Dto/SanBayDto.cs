using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class SanBayDto
    {
        [Key]
        public string MaSB { get; set; }
        public string TenSB { get; set; }

        public int TGDungMin { get; set; }

        public int TGDungMax { get; set; }

        public string ViTri { get; set; }
    }
}
