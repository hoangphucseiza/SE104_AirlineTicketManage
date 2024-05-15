using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class UpdateSanBayDto
    {
        public string MaSanBay { get; set; }
        public string TenSanBay { get; set; }
        public int ThoiGianDungMin { get; set; }
        public int ThoiGianDungMax { get; set; }

        public string ViTri { get; set; }

        public ICollection<SanBayDenDto> SanBayDens { get; set;}

    }
}
