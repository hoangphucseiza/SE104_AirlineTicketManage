namespace SE104_AirlineTicketManage.Server.Dto
{
    public class ThemLichChuyenBayDto_1
    {
        public string MaSanBayDi { get; set; }
        public string MaSanBayDen { get; set; }
        public DateTime NgayGioBay { get; set; }
        public int ThoiGianBay { get; set; }
        public decimal GiaVe { get; set; }
        public ICollection<ThemLichChuyenBayDto_SanBayDung> SanBayDungs { get; set; }
        public ICollection<ThemLichChuyenBayDto_HangVe> HangVes { get; set; }
    }
}
