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
            CreateMap<ChuyenBayDto, ChuyenBay>();
            CreateMap<HangVe, HangVeDto>();
            CreateMap<HangVeDto, HangVe>();
            CreateMap<SanBay, SanBayDto>();
            CreateMap<SanBayDto, SanBay>();
            CreateMap<KhachHang, KhachHangDto>();
            CreateMap<KhachHangDto, KhachHang>();
            CreateMap<VeMayBay, VeMayBayDto>();
            CreateMap<VeMayBayDto, VeMayBay>();
            CreateMap<QuyDinhChungDto, QuyDinhChung>();
            CreateMap<GetDanhSachChuyenBayDto, ChuyenBay>();
            CreateMap<ChuyenBayHangVeDto, ChuyenBayHangVe>();

            // Mapping CreateVeMayBayDto to VeMayBay
            CreateMap<CreateVeMayBayDto, VeMayBay>();
        }
    }
}
