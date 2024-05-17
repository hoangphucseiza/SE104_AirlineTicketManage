namespace SE104_AirlineTicketManage.Server.Dto
{
    public class ThemPhieuDatChoDto
    {
        public string MaCB { get; set; }
        public string TenKhachHang { get; set; }
        public string SDT { get; set; }
        public string CMND { get; set; }

        public DateTime NgayDat { get; set; }

        public DateTime? NgayMua { get; set; }

        public decimal GiaTien { get; set; }

        public string MaHangVe { get; set; }

        public int TrangThaiVe { get; set; }


    }
}
