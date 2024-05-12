using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class VeMayBayRepository : IVeMayBayRepository
    {
        private readonly DataContext _dataContext;
        public VeMayBayRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public VeMayBay GetVeMayBay(string maVe)
        {
            throw new NotImplementedException();
        }

        public ICollection<VeMayBay> GetVeMayBays()
        {
            return _dataContext.VeMayBays.OrderBy(p => p.MaVe).ToList();
        }

        public bool VeMayBayExists(string maVe)
        {
            return _dataContext.VeMayBays.Any(p => p.MaVe == maVe);
        }
    }
}
