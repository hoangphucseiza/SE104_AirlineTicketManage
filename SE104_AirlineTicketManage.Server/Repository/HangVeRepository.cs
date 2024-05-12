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
            throw new NotImplementedException();
        }
    }
}
