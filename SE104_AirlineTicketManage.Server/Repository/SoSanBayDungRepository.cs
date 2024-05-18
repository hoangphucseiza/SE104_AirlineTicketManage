using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Interfaces;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class SoSanBayDungRepository : ISoSanBayDungRepository
    {
        private readonly DataContext _context;

        public SoSanBayDungRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public int GetSoSBDungToiDa(string maSBDi, string maSBDen)
        {
            return _context.SoSanBayDungs.Where(p => p.MaSanBayDi == maSBDi && p.MaSanBayDen == maSBDen).Select(p => p.SoSBDung_Max).FirstOrDefault();
        }

        public int GetThoiGianBayToiThieu(string maSBDi, string maSBDen)
        {
            return _context.SoSanBayDungs.Where(p => p.MaSanBayDi == maSBDi && p.MaSanBayDen == maSBDen).Select(p => p.ThoiGianBayToiThieu).FirstOrDefault();
        }

        public bool Save()
        {
           var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool SoSanBayDungExists(string maSBDi, string maSBDen)
        {
            return _context.SoSanBayDungs.Any(p => p.MaSanBayDi == maSBDi && p.MaSanBayDen == maSBDen);
        }

        public bool UpdateSoSBDungToiDa(string maSB1, string maSB2, int SoSBDungMax)
        {
            var sanBay = _context.SoSanBayDungs.Where(p => p.MaSanBayDi == maSB1 && p.MaSanBayDen == maSB2).FirstOrDefault();

            sanBay.SoSBDung_Max = SoSBDungMax;

            return Save();

        }
    }
}
