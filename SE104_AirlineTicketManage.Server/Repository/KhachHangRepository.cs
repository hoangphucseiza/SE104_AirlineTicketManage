using AutoMapper;
using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Interfaces;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Repository
{
    public class KhachHangRepository : IKhachHangRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public KhachHangRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
        public KhachHang GetKhachHangByCCCD(string cccd)
        {
            return _context.KhachHangs.Where(p => p.CMND == cccd).FirstOrDefault();
        }

        public KhachHang GetKhachHangByMaKH(string maKH)
        {
            return _context.KhachHangs.Where(p => p.MaKH == maKH).FirstOrDefault();
        }

        public KhachHang GetKhachHangBySDT(string sdt)
        {
            return _context.KhachHangs.Where(p => p.SDT == sdt).FirstOrDefault();
        }

        public GetDetailKhachHangDto GetKhachHangDetail(string maKH)
        {
            var getDetailKhachHangDto = new GetDetailKhachHangDto();
            var kh = _context.KhachHangs.Where(p => p.MaKH == maKH).FirstOrDefault();
            var vmb = _mapper.Map<List<VeMayBayDto>>(_context.VeMayBays.OrderBy(p => p.MaKH).ToList());

            getDetailKhachHangDto.MaKH = kh.MaKH;
            getDetailKhachHangDto.TenKH = kh.TenKH;
            getDetailKhachHangDto.SDT = kh.SDT;
            getDetailKhachHangDto.CMND = kh.CMND;
            getDetailKhachHangDto.VeMayBays = vmb;

            return getDetailKhachHangDto;
        }
        public ICollection<KhachHang> GetDanhSachKhachHang(int phantrang)
        {
            int pageSize = (phantrang - 1) * 10;

            return _context.KhachHangs.OrderBy(p => p.MaKH).Skip(pageSize).Take(10).ToList();
        }

        public bool KhachHangCCCDExists(string cccd)
        {
            return _context.KhachHangs.Any(p => p.CMND == cccd);
        }

    

        public bool KhachHangSDTExists(string sdt)
        {
            return _context.KhachHangs.Any(p => p.SDT == sdt);
        }
    }
}
