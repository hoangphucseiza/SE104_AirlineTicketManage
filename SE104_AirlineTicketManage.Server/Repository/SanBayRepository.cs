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

        public SanBay GetSanBayByMaSB(string maSB)
        {
            return _context.SanBays.Where(p => p.MaSB == maSB).FirstOrDefault();
        }

        public ICollection<SanBay> GetDanhSachSanBay(int phantrang)
        {
            int pageSize = (phantrang -1 ) * 10;

            return _context.SanBays.OrderBy(p => p.MaSB).Skip(pageSize).Take(10).ToList();
        }

        public ICollection<SanBay> GetSanBayByTGDungToiDa(int thoigiandung, int phantrang)
        {
            var sanBays = _context.SanBays.Where(p => p.TGDungMax <= thoigiandung)
                .OrderBy(p => p.MaSB)
                .Skip((phantrang - 1) * 10)
                .Take(10)
                .ToList();
            return sanBays;
        }

        public ICollection<SanBay> GetSanBayByTGDungToiThieu(int thoigiandung, int phantrang)
        {
            var sanBays = _context.SanBays.Where(p => p.TGDungMin >= thoigiandung)
                .OrderBy(p => p.MaSB)
                .Skip((phantrang - 1) * 10)
                .Take(10)
                .ToList();
            return sanBays;
        }

        public ICollection<SanBay> GetSanBayByTGDung(int dungtoithieu, int dungtoida, int phantrang)
        {
            var sanBays = _context.SanBays.Where(p => p.TGDungMin >= dungtoithieu && p.TGDungMax <= dungtoida)
              .OrderBy(p => p.MaSB)
              .Skip((phantrang - 1) * 10)
              .Take(10)
              .ToList();
            return sanBays;
        }
    }
}
