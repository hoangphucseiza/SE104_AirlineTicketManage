using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Interfaces;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class SoSanBayDungRepository : ISoSanBayDungRepository
    {
        private readonly DataContext _dataContext;

        public SoSanBayDungRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public int GetSoSBDungToiDa(string maSBDi, string maSBDen)
        {
            return _dataContext.SoSanBayDungs.Where(p => p.MaSanBayDi == maSBDi && p.MaSanBayDen == maSBDen).Select(p => p.SoSBDung_Max).FirstOrDefault();
        }

        public bool Save()
        {
           var saved = _dataContext.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool SoSanBayDungExists(string maSBDi, string maSBDen)
        {
            return _dataContext.SoSanBayDungs.Any(p => p.MaSanBayDi == maSBDi && p.MaSanBayDen == maSBDen);
        }
    }
}
