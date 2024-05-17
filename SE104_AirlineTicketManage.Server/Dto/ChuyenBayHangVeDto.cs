using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class ChuyenBayHangVeDto
    {
        public string MaCB { get; set; }
        public string MaHV { get; set; }

        public ChuyenBay ChuyenBay { get; set; }

        public HangVe HangVe { get; set; }

        public int SoLuong { get; set; }
    }
}
