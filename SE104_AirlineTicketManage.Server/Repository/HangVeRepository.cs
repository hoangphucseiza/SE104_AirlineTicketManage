using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class HangVeRepository : IHangVeRepository
    {
        private readonly DataContext _context;
        public HangVeRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateHangVe(HangVe hangVe)
        {
            _context.Add(hangVe);

            return Save();
        }

        public ICollection<HangVe> GetDanhSachHangVe()
        {
            return _context.HangVes.OrderBy(p => p.MaHV).ToList();
        }

        public HangVe GetDanhSachHangVe(string MaHV)
        {
            return _context.HangVes.Where(p => p.MaHV == MaHV).FirstOrDefault();
        }

        public ICollection<HangVe> GetHangVes()
        {
            throw new NotImplementedException();
        }

        public float GetTiLeHangVe(string maHV)
        {
            return (float)_context.HangVes.Where(p => p.MaHV == maHV).Select(p => p.TiLe_Gia).FirstOrDefault();
        }

        public bool HangVeExists(string maHV)
        {
            return _context.HangVes.Any(p => p.MaHV == maHV);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateHangVe(HangVe hangVe)
        {
            _context.Update(hangVe);
            return Save();
        }
    }
}
