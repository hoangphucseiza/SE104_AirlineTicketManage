using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<ChuyenBay> ChuyenBays { get; set; }
        public DbSet<HangVe> HangVes { get; set; }
        public DbSet<ChuyenBayHangVe> ChuyenBayHangVes { get; set; }
        public DbSet<KhachHang> KhachHangs { get; set; }
        public DbSet<VeMayBay> VeMayBays { get; set; }

        public DbSet<QuyDinhChung> QuyDinhChungs { get; set; }

        public DbSet<SanBayTrungGian> SanBayTrungGians { get; set; }

        public DbSet<SanBay> SanBays { get; set; }

        public DbSet<SoSanBayDung> SoSanBayDungs { get; set; }
        public object HangVe { get; internal set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ChuyenBayHangVe>()
                .HasKey(CBHV => new { CBHV.MaHV, CBHV.MaCB });
            modelBuilder.Entity<ChuyenBayHangVe>()
                .HasOne(CBHV => CBHV.ChuyenBay)
                .WithMany(cb => cb.ChuyenBayHangVes)
                .HasForeignKey(CBHV => CBHV.MaCB);
            modelBuilder.Entity<ChuyenBayHangVe>()
                .HasOne(CBHV => CBHV.HangVe)
                .WithMany(hv => hv.ChuyenBayHangVes)
                .HasForeignKey(CBHV => CBHV.MaHV);

            modelBuilder.Entity<SanBayTrungGian>()
               .HasKey(sbtg => new { sbtg.MaCB, sbtg.MaSB });
            modelBuilder.Entity<SanBayTrungGian>()
                 .HasOne(sbtg => sbtg.ChuyenBay)
                 .WithMany(cb => cb.SanBayTrungGians)
                 .HasForeignKey(sbtg => sbtg.MaCB);
            modelBuilder.Entity<SanBayTrungGian>()
                .HasOne(sbtg => sbtg.SanBay)
                .WithMany(sb => sb.SanBayTrungGians)
                .HasForeignKey(sbtg => sbtg.MaSB);

           
            modelBuilder.Entity<VeMayBay>()
                .HasOne(vmb => vmb.ChuyenBay)
                .WithMany(cb => cb.VeMayBays)
                .HasForeignKey(vmb => vmb.MaCB);
            modelBuilder.Entity<VeMayBay>()
                .HasOne(vmb => vmb.HangVe)
                .WithMany(hv => hv.VeMayBays)
                .HasForeignKey(vmb => vmb.MaHV);
            modelBuilder.Entity<VeMayBay>()
                .HasOne(vmb => vmb.KhachHang)
                .WithMany(kh => kh.VeMayBays)
                .HasForeignKey(vmb => vmb.MaKH);


            modelBuilder.Entity<SoSanBayDung>()
                .HasKey(ssbd => new { ssbd.MaSanBayDi, ssbd.MaSanBayDen });

  
            //modelBuilder.Entity<QuyDinhChung>()
            //    .HasNoKey();
            // Seed Data
            modelBuilder.Entity<HangVe>().HasData(
                               new HangVe
                               {
                                   MaHV = "HV01",
                                   TenHV = "Hang thuong gia",
                                   TiLe_Gia = 1.5
                               },
                               new HangVe
                               {
                                   MaHV = "HV02",
                                   TenHV = "Hang pho thong",
                                   TiLe_Gia = 1
                               }
           );
            modelBuilder.Entity<ChuyenBay>().HasData(
                               new ChuyenBay
                               {
                                   MaCB = "CB01",
                                   NgayGio = new System.DateTime(2021, 12, 1),
                                   ThoiGianBay = 120,
                                   GiaVe = 1000000,
                                   MaSB_Di = "SB01",
                                   MaSB_Den = "SB02"
                               },
                               new ChuyenBay
                               {
                                   MaCB = "CB02",
                                   NgayGio = new System.DateTime(2021, 12, 2),
                                   ThoiGianBay = 120,
                                   GiaVe = 1000000,
                                   MaSB_Di = "SB02",
                                   MaSB_Den = "SB03"
                               },
                               new ChuyenBay
                               {
                                   MaCB = "CB03",
                                   NgayGio = new System.DateTime(2021, 12, 3),
                                   ThoiGianBay = 120,
                                   GiaVe = 1000000,
                                   MaSB_Di = "SB03",
                                   MaSB_Den = "SB04"
                               },
                               new ChuyenBay
                               {
                                   MaCB = "CB04",
                                   NgayGio = new System.DateTime(2021, 12, 4),
                                   ThoiGianBay = 120,
                                   GiaVe = 1000000,
                                   MaSB_Di = "SB04",
                                   MaSB_Den = "SB05"
                               },
                               new ChuyenBay
                               {
                                   MaCB = "CB05",
                                   NgayGio = new System.DateTime(2021, 12, 5),
                                   ThoiGianBay = 120,
                                   GiaVe = 1000000,
                                   MaSB_Di = "SB05",
                                   MaSB_Den = "SB06"
                               },
                               new ChuyenBay
                               {
                                   MaCB = "CB06",
                                   NgayGio = new System.DateTime(2021, 12, 6),
                                   ThoiGianBay = 120,
                                   GiaVe = 1000000,
                                   MaSB_Di = "SB06",
                                   MaSB_Den = "SB07"
                               },
                               new ChuyenBay
                               {
                                   MaCB = "CB07",
                                   NgayGio = new System.DateTime(2021, 12, 7),
                                   ThoiGianBay = 120,
                                   GiaVe = 1000000,
                                   MaSB_Di = "SB07",
                                   MaSB_Den = "SB08"
                               },
                               new ChuyenBay
                               {
                                   MaCB = "CB08",
                                   NgayGio = new System.DateTime(2021, 12, 8),
                                   ThoiGianBay = 120,
                                   GiaVe = 1000000,
                                   MaSB_Di = "SB08",
                                   MaSB_Den = "SB09"
                               },
                               new ChuyenBay
                               {
                                   MaCB = "CB09",
                                   NgayGio = new System.DateTime(2021, 12, 9),
                                   ThoiGianBay = 120,
                                   GiaVe = 1000000,
                                   MaSB_Di = "SB09",
                                   MaSB_Den = "SB10"
                               }
         );
            modelBuilder.Entity<ChuyenBayHangVe>().HasData(
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB01",
                                   MaHV = "HV01",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                    MaCB = "CB01",
                                    MaHV = "HV02",
                                    SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB02",
                                   MaHV = "HV01",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB02",
                                   MaHV = "HV02",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB03",
                                   MaHV = "HV01",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB03",
                                   MaHV = "HV02",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB04",
                                   MaHV = "HV01",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB04",
                                   MaHV = "HV02",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB05",
                                   MaHV = "HV01",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB05",
                                   MaHV = "HV02",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB06",
                                   MaHV = "HV01",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB06",
                                   MaHV = "HV02",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB07",
                                   MaHV = "HV01",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB07",
                                   MaHV = "HV02",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB08",
                                   MaHV = "HV01",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB08",
                                   MaHV = "HV02",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB09",
                                   MaHV = "HV01",
                                   SoLuong = 50
                               },
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB09",
                                   MaHV = "HV02",
                                   SoLuong = 50
                               }

         );
            modelBuilder.Entity<SanBay>().HasData(
                               new SanBay
                               {
                                   MaSB = "SB01",
                                   TenSB = "Noi Bai",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Ha Noi"
                               },
                               new SanBay
                               {
                                   MaSB = "SB02",
                                   TenSB = "Tan Son Nhat",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Ho Chi Minh"
                               },
                               new SanBay
                               {
                                   MaSB = "SB03",
                                   TenSB = "Da Nang",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Da Nang"
                               },
                               new SanBay
                               {
                                   MaSB = "SB04",
                                   TenSB = "Cam Ranh",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Khanh Hoa"
                               },
                               new SanBay
                               {
                                   MaSB = "SB05",
                                   TenSB = "Phu Quoc",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Kien Giang"
                               },
                               new SanBay
                               {
                                   MaSB = "SB06",
                                   TenSB = "Can Tho",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Can Tho"
                               },
                               new SanBay
                               {
                                   MaSB = "SB07",
                                   TenSB = "Buon Ma Thuot",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Dak Lak"
                               },
                               new SanBay
                               {
                                   MaSB = "SB08",
                                   TenSB = "Pleiku",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Gia Lai"
                               },
                               new SanBay
                               {
                                   MaSB = "SB09",
                                   TenSB = "Vinh",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Nghe An"
                               },
                               new SanBay
                               {
                                   MaSB = "SB10",
                                   TenSB = "Hue",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Thua Thien Hue"
                               },
                               new SanBay
                               {
                                   MaSB = "SB11",
                                   TenSB = "Hai Phong",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Hai Phong"
                               },
                               new SanBay
                               {
                                   MaSB = "SB12",
                                   TenSB = "Dong Hoi",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Quang Binh"
                               },
                               new SanBay
                               {
                                   MaSB = "SB13",
                                   TenSB = "Rach Gia",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Kien Giang"
                               },
                               new SanBay
                               {
                                   MaSB = "SB14",
                                   TenSB = "Con Dao",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Ba Ria - Vung Tau"
                               },
                               new SanBay
                               {
                                   MaSB = "SB15",
                                   TenSB = "Ca Mau",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Ca Mau"
                               },
                               new SanBay
                               {
                                   MaSB = "SB16",
                                   TenSB = "Quy Nhon",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Binh Dinh"
                               },
                               new SanBay
                               {
                                   MaSB = "SB17",
                                   TenSB = "Tuy Hoa",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Phu Yen"
                               },
                               new SanBay
                               {
                                   MaSB = "SB18",
                                   TenSB = "Phu Cat",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Binh Dinh"
                               },
                               new SanBay
                               {
                                   MaSB = "SB19",
                                   TenSB = "Dien Bien",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Dien Bien"
                               },
                               new SanBay
                               {
                                   MaSB = "SB20",
                                   TenSB = "Chu Lai",
                                   TGDungMin = 30,
                                   TGDungMax = 60,
                                   ViTri = "Quảng nam"
                               }
                 );
            modelBuilder.Entity<SanBayTrungGian>().HasData(
                               new SanBayTrungGian
                               {
                                   MaCB = "CB01",
                                   MaSB = "SB01",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 1"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB01",
                                   MaSB = "SB02",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 2"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB02",
                                   MaSB = "SB02",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 3"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB02",
                                   MaSB = "SB03",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 4"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB03",
                                   MaSB = "SB03",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 5"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB03",
                                   MaSB = "SB04",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 6"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB04",
                                   MaSB = "SB04",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 7"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB04",
                                   MaSB = "SB05",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 8"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB05",
                                   MaSB = "SB05",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 9"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB05",
                                   MaSB = "SB06",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 10"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB06",
                                   MaSB = "SB06",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 11"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB06",
                                   MaSB = "SB07",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 12"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB07",
                                   MaSB = "SB07",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 13"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB07",
                                   MaSB = "SB08",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 14"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB08",
                                   MaSB = "SB08",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 15"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB08",
                                   MaSB = "SB09",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 16"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB09",
                                   MaSB = "SB09",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 17"
                               },
                               new SanBayTrungGian
                               {
                                   MaCB = "CB09",
                                   MaSB = "SB10",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 18"
                               }

               );
            modelBuilder.Entity<VeMayBay>().HasData(
                               new VeMayBay
                               {
                                   MaVe = "VMB01",
                                   MaCB = "CB01",
                                   MaHV = "HV01",
                                   MaKH = "KH01",
                                   GiaTien = 1500000,
                                   NgayDat = new System.DateTime(2021, 11, 1),
                                   NgayMua = new System.DateTime(2021, 11, 2),
                                   TrangThai = "Đã mua"
                               },
                               new VeMayBay
                               {
                                   MaVe = "VMB02",
                                   MaCB = "CB01",
                                   MaHV = "HV02",
                                   MaKH = "KH02",
                                   GiaTien = 1000000,
                                   NgayDat = new System.DateTime(2021, 11, 1),
                                   NgayMua = null,
                                   TrangThai = "Chưa Thanh Toán"
                               },
                               new VeMayBay
                               {
                                   MaVe = "VMB03",
                                   MaCB = "CB02",
                                   MaHV = "HV01",
                                   MaKH = "KH03",
                                   GiaTien = 1500000,
                                   NgayDat = new System.DateTime(2021, 11, 2),
                                   NgayMua = new System.DateTime(2021, 11, 3),
                                   TrangThai = "Đã mua"
                               },
                               new VeMayBay
                               {
                                   MaVe = "VMB04",
                                   MaCB = "CB02",
                                   MaHV = "HV02",
                                   MaKH = "KH04",
                                   GiaTien = 1000000,
                                   NgayDat = new System.DateTime(2021, 11, 2),
                                   NgayMua = null,
                                   TrangThai = "Chưa Thanh Toán"
                               },
                               new VeMayBay
                               {
                                   MaVe = "VMB05",
                                   MaCB = "CB03",
                                   MaHV = "HV01",
                                   MaKH = "KH05",
                                   GiaTien = 1500000,
                                   NgayDat = new System.DateTime(2021, 11, 3),
                                   NgayMua = new System.DateTime(2021, 11, 4),
                                   TrangThai = "Đã mua"
                               },
                               new VeMayBay
                               {
                                   MaVe = "VMB06",
                                   MaCB = "CB03",
                                   MaHV = "HV02",
                                   MaKH = "KH06",
                                   GiaTien = 1000000,
                                   NgayDat = new System.DateTime(2021, 11, 3),
                                   NgayMua = null,
                                   TrangThai = "Chưa Thanh Toán"
                               },
                               new VeMayBay
                               {
                                   MaVe = "VMB07",
                                   MaCB = "CB04",
                                   MaHV = "HV01",
                                   MaKH = "KH07",
                                   GiaTien = 1500000,
                                   NgayDat = new System.DateTime(2021, 11, 4),
                                   NgayMua = new System.DateTime(2021, 11, 5),
                                   TrangThai = "Đã mua"
                               },
                               new VeMayBay
                               {
                                   MaVe = "VMB08",
                                   MaCB = "CB04",
                                   MaHV = "HV02",
                                   MaKH = "KH08",
                                   GiaTien = 1000000,
                                   NgayDat = new System.DateTime(2021, 11, 4),
                                   NgayMua = null,
                                   TrangThai = "Chưa Thanh Toán"
                               }
            );
        modelBuilder.Entity<KhachHang>().HasData(
                    new KhachHang
                    {
                        MaKH = "KH01",
                        CMND = "123456789",
                        TenKH = "Nguyen Van A",
                        SDT = "0123456780"
                    },
                    new KhachHang
                    {
                        MaKH = "KH02",
                        CMND = "987654321",
                        TenKH = "Nguyen Van B",
                        SDT = "0123456781"
                    },
                    new KhachHang
                    {
                        MaKH = "KH03",
                        CMND = "456789123",
                        TenKH = "Nguyen Van C",
                        SDT = "0123456782"
                    },
                    new KhachHang
                    {
                        MaKH = "KH04",
                        CMND = "321654987",
                        TenKH = "Nguyen Van D",
                        SDT = "0123456783"
                    },
                    new KhachHang
                    {
                        MaKH = "KH05",
                        CMND = "789123456",
                        TenKH = "Nguyen Van E",
                        SDT = "0123456784"
                    },
                    new KhachHang
                    {
                        MaKH = "KH06",
                        CMND = "654987321",
                        TenKH = "Nguyen Van F",
                        SDT = "0123456785"
                    },
                    new KhachHang
                    {
                        MaKH = "KH07",
                        CMND = "123789456",
                        TenKH = "Nguyen Van G",
                        SDT = "0123456786"
                    },
                    new KhachHang
                    {
                        MaKH = "KH08",
                        CMND = "987123654",
                        TenKH = "Nguyen Van H",
                        SDT = "0123456787"
                    },
                    new KhachHang
                    {
                        MaKH = "KH09",
                        CMND = "456123789",
                        TenKH = "Nguyen Van I",
                        SDT = "0123456788"
                    },
                    new KhachHang
                    {
                        MaKH = "KH10",
                        CMND = "321987654",
                        TenKH = "Nguyen Van K",
                        SDT = "0123456789"
                    }
                );
            modelBuilder.Entity<QuyDinhChung>().HasData(
                new QuyDinhChung
                {
                    ID = 1,
                    ThoiGianChamNhatDatVe = 30,
                    ThoiGianHuyDatVe = 3,
                }
            );
            modelBuilder.Entity<SoSanBayDung>().HasData(
               new SoSanBayDung
               {
                   MaSanBayDi = "SB01",
                   MaSanBayDen = "SB02",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB01",
                   MaSanBayDen = "SB03",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB01",
                   MaSanBayDen = "SB04",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB01",
                   MaSanBayDen = "SB05",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB01",
                   MaSanBayDen = "SB06",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB01",
                   MaSanBayDen = "SB07",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB01",
                   MaSanBayDen = "SB08",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB01",
                   MaSanBayDen = "SB09",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB01",
                   MaSanBayDen = "SB10",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB02",
                   MaSanBayDen = "SB03",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB02",
                   MaSanBayDen = "SB04",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB02",
                   MaSanBayDen = "SB05",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               },
               new SoSanBayDung
               {
                   MaSanBayDi = "SB02",
                   MaSanBayDen = "SB06",
                   SoSBDung_Max = 1,
                   ThoiGianBayToiThieu = 120
               }
           );
        }
    }

    public class YourDbContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer("Server=DESKTOP-OOEM27J;Database=SE104_AirlineTicketManage;Trusted_Connection=true");

            return new DataContext(optionsBuilder.Options);
        }
    }
}
