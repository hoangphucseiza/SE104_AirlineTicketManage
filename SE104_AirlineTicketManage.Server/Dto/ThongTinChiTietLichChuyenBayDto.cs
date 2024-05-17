namespace SE104_AirlineTicketManage.Server.Dto
{
    public class ThongTinChiTietLichChuyenBayDto
    {
        public string MaCB { get; set; }
        public string MaSanBayDi { get; set; }
        public string MaSanBayDen { get; set; }

        public DateTime NgayGioBay { get; set; }

        public int ThoiGianBay { get; set; }
        public decimal GiaVe { get; set; }

        public ICollection<ThongTinChiTietLichChuyenBayDto_SanBayDung> SanBayDungs { get; set; }
        public ICollection<ThongTinChiTietLichChuyenBayDto_HangVe> HangVes { get; set; }
    }
}
