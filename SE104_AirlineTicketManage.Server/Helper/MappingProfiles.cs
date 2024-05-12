using AutoMapper;
using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ChuyenBay, ChuyenBayDto>();
            CreateMap<HangVe, HangVeDto>();
            CreateMap<SanBay, SanBayDto>();
            CreateMap<KhachHang, KhachHangDto>();
            CreateMap<VeMayBay, VeMayBayDto>();
        }
    }
}
