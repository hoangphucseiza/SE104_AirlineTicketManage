using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class DanhSachChuyenBayDto
    {
        [Key]
        public string MaCB { get; set; }
        public SanBayDto  SanBayDi { get; set; }
        public SanBayDto SanBayDen { get; set; }

        public DateTime NgayGioBay { get; set; }
        public DateTime NgayGioDen { get; set; }

        public int TongSoVe { get; set; }

        public int SoVeMua { get; set; }
    }
}
