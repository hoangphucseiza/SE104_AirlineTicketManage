using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class GetChiTietByMaVeDto
    {
        [Key]
        //VeMayBay
        public string MaVe { get; set; }
        public decimal GiaTien { get; set; }
        public DateTime NgayDat { get; set; }
        public DateTime? NgayMua { get; set; }
        public string TrangThai { get; set; }
        //ChuyenBay
        public string MaCB { get; set; }
        public SanBayDto SanBayDi { get; set; }
        public SanBayDto SanBayDen { get; set; }
        public DateTime NgayGioBay { get; set; }
        public DateTime NgayGioDen { get; set; }
        //HangVe
        public string MaHV { get; set; }
        public string TenHV { get; set; }
        //KhachHang
        public string MaKH { get; set; }
        public string TenKH { get; set; }
        public string CMND { get; set; }
        public string SDT { get; set; }
    }
}
