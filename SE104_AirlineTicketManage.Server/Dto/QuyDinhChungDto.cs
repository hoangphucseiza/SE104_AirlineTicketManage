using System.ComponentModel.DataAnnotations;

namespace SE104_AirlineTicketManage.Server.Dto
{
    public class QuyDinhChungDto
    {
        [Key]
        public int ID { get; set; }
        public int ThoiGianChamNhatDatVe { get; set; }
        public int ThoiGianHuyDatVe { get; set; }
    }
}
