using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Models
{
    public class QuyDinhChung
    {
        [Key]
        public int ID { get; set; }
        public int ThoiGianChamNhatDatVe { get; set; }
        public int ThoiGianHuyDatVe { get; set; }
    }
}
