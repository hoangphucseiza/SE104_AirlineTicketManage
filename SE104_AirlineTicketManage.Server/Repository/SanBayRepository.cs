using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class SanBayRepository : ISanBayRepository
    {
        private readonly DataContext _context;
        public SanBayRepository(DataContext context)
        {
            _context = context;
        }
        public ICollection<SanBay> GetSanBays()
        {
           return _context.SanBays.OrderBy(p => p.MaSB).ToList();
        }

        public SanBay GetSanBay(string maSB)
        {
            return _context.SanBays.Where(p => p.MaSB == maSB).FirstOrDefault();
        }

        public bool SanbayExists(string maSB)
        {
            return _context.SanBays.Any(p => p.MaSB == maSB);
        }


        public bool CreateSanBay(SanBay sanBay)
        {
            _context.Add(sanBay);

            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved >= 0 ? true : false;
        }

        public bool UpdateSanBay(SanBay sanBay)
        {
            _context.Update(sanBay);
            return Save();
        }
    }
}
