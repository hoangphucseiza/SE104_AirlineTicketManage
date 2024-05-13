using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class VeMayBayRepository : IVeMayBayRepository
    {
        private readonly DataContext _context;
        public VeMayBayRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public bool CreateVeMayBay(string maCB, string maKH, string maHV, VeMayBay veMayBay)
        {
            var VeMayBay = new VeMayBay
            {
                MaVe = veMayBay.MaVe,
                MaCB = maCB,
                MaKH = maKH,
                MaHV = maHV,
                GiaTien = veMayBay.GiaTien,
                NgayDat = veMayBay.NgayDat,
                NgayMua = veMayBay.NgayMua,
                TrangThai = "Chưa thanh toán"
            };
            _context.VeMayBays.Add(VeMayBay);
            return Save();

        }

        public VeMayBay GetVeMayBay(string maVe)
        {
            return _context.VeMayBays.Where(p => p.MaVe == maVe).FirstOrDefault();
        }

        public ICollection<VeMayBay> GetVeMayBays()
        {
            return _context.VeMayBays.OrderBy(p => p.MaVe).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool VeMayBayExists(string maVe)
        {
            return _context.VeMayBays.Any(p => p.MaVe == maVe);
        }
    }
}
