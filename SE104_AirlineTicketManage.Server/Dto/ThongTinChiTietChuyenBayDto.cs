namespace SE104_AirlineTicketManage.Server.Dto
{
    public class ThongTinChiTietChuyenBayDto
    {
        public string MaChuyenBay { get; set; }
        public ThongTinChiTietChuyenBay_SanBayDto SanBayDi { get; set; }
        public ThongTinChiTietChuyenBay_SanBayDto SanBayDen { get; set; }

        public DateTime NgayGioBay { get; set; }

        public DateTime NgayGioDen { get; set; }

        public int ThoiGianBay { get; set; }

        public decimal GiaVe { get; set; }

        public ICollection<ThongTinChiTietChuyenBay_HangVe> DanhSachThongTinHangVe { get; set; }

        public ICollection<ThongTinChiTietChuyenBay_SanBayDung> DanhSachSanBayDung { get; set; }


    }
}
