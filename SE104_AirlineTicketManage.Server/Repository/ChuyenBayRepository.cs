using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class ChuyenBayRepository : IChuyenBayRepository
    {
        private readonly DataContext _context;
        public ChuyenBayRepository(DataContext context)
        {
            _context = context;
        }

        public bool ChuyenBayExists(string maCB)
        {
            return _context.ChuyenBays.Any(p => p.MaCB == maCB);
        }

        public ChuyenBay GetChuyenBay(string maCB)
        {
            return _context.ChuyenBays.Where(p => p.MaCB == maCB).FirstOrDefault();
        }

  

        public ICollection<ChuyenBay> GetChuyenBays()
        {
            return _context.ChuyenBays.OrderBy(p => p.MaCB).ToList();
        }
    }
}
