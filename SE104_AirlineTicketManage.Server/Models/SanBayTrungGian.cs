﻿namespace SE104_AirlineTicketManage.Server.Models
{
    public class SanBayTrungGian
    {
        public string MaCB { get; set; }
        public string MaSB { get; set; }

        public ChuyenBay ChuyenBay { get; set; }

        public SanBay SanBay { get; set; }

        public int TGDung { get; set; }

        public string GhiChu { get; set; }
    }
}
