using SE104_AirlineTicketManage.Server.Data;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server
{
    public class Seed
    {
        private readonly DataContext dataContext;

        public Seed(DataContext context)
        {
            this.dataContext = context;
        }
        public void SeedDataContext()
        {
            if (!dataContext.SanBayTrungGians.Any())
            {
                var sanbaytrunggians = new List<SanBayTrungGian>()
                {
                    new SanBayTrungGian()
                    {
                        SanBay = new SanBay()
                        {
                            MaSB = "SB01",
                            TenSB = "Noi Bai",
                            TGDungMin = 30,
                            TGDungMax = 60,
                            ViTri = "Ha Noi"
                        },
                        TGDung = 45,
                        GhiChu = "Ghi chu 1",
                        ChuyenBay = new ChuyenBay()
                        {
                            MaCB = "CB01",
                            NgayGio = new DateTime(2021, 12, 1),
                            ThoiGianBay = 120,
                            GiaVe = 1000000,
                            MaSB_Di = "SB01",
                            MaSB_Den = "SB02",
                            ChuyenBayHangVes = new List<ChuyenBayHangVe>()
                            {
                                new ChuyenBayHangVe()
                                {
                                    MaCB = "CB01",
                                    HangVe = new HangVe()
                                    {
                                        MaHV = "HV01",
                                        TenHV = "Hang thuong gia",
                                        TiLe_Gia = 1.5
                                    },
                                    SoLuong = 100,
                                }
                            },
                           VeMayBays = new List<VeMayBay>()
                           {
                               new VeMayBay()
                               {
                                   MaVe = "VMB01",
                                   ChuyenBay = dataContext.ChuyenBays.Find("CB01"),
                                  HangVe = dataContext.HangVes.Find("HV01"),
                                   GiaTien = 1500000,
                                   NgayDat = new DateTime(2021, 11, 1),
                                   NgayMua = new DateTime(2021, 11, 2),
                                   TrangThai = "Da mua",
                                   KhachHang = new KhachHang()
                                   {
                                       MaKH = "KH01",
                                       CMND = "123456789",
                                       TenKH = "Nguyen Van A",
                                       SDT = "0123456789",
                                   }
                               }
                           }
                        }

                    }
                };
                dataContext.SanBayTrungGians.AddRange(sanbaytrunggians);
                dataContext.SaveChanges();
            }
            
        }
    }
}
