namespace SE104_AirlineTicketManage.Server.Models
{
    public class SoSanBayDung
    {
        public string MaSanBayDi { get; set; }

        public string MaSanBayDen { get; set; }

        public SanBay SanBay_Di { get; set; }

        public SanBay SanBay_Den { get; set; }

        public int SoSBDung_Max { get; set; }
    }
}
