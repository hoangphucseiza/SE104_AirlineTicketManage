using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class KhachHangRepository : IKhachHangRepository
    {
        private readonly DataContext _context;
        public KhachHangRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateKhachHang()
        {
            throw new NotImplementedException();
        }

        public KhachHang GetKhachHang(string maKH)
        {
            throw new NotImplementedException();
        }

        public ICollection<KhachHang> GetKhachHangs()
        {
            return _context.KhachHangs.OrderBy(p => p.MaKH).ToList();
        }

        public bool KhachHangExists(string maKH)
        {
            return _context.KhachHangs.Any(p => p.MaKH == maKH);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
