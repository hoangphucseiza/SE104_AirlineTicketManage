﻿using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class QuyDinhChungRepository : IQuyDinhChungRepository
    {
        private readonly DataContext _context;

        public QuyDinhChungRepository(DataContext context)
        {
            _context = context;
        }
        public int GetThoiGianChamNhatDatVe()
        {
            return _context.QuyDinhChungs.Where(p => p.ID == 1).Select(p => p.ThoiGianChamNhatDatVe).FirstOrDefault();
        }

  

        public int GetThoiGianHuyDatVe()
        {
            return _context.QuyDinhChungs.Where(p => p.ID == 1).Select(p => p.ThoiGianHuyDatVe).FirstOrDefault();
        }

        public bool QuyDinhChungExists(int id)
        {
            return _context.QuyDinhChungs.Any(p => p.ID == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateQuyDinhChung(QuyDinhChung quyDinhChung)
        {
            _context.Update(quyDinhChung);
            return Save();
        }
    }
}
