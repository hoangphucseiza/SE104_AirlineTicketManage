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
                               }
                                          );
            modelBuilder.Entity<ChuyenBayHangVe>().HasData(
                               new ChuyenBayHangVe
                               {
                                   MaCB = "CB01",
                                   MaHV = "HV01",
                                   SoLuong = 100
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
                               }
                 );
            modelBuilder.Entity<SanBayTrungGian>().HasData(
                               new SanBayTrungGian
                               {
                                   MaCB = "CB01",
                                   MaSB = "SB01",
                                   TGDung = 45,
                                   GhiChu = "Ghi chu 1"
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
                                   TrangThai = "Da mua"
                               }
            );
            modelBuilder.Entity<KhachHang>().HasData(
                new KhachHang
                     {
                        MaKH = "KH01",
                        CMND = "123456789",
                        TenKH = "Nguyen Van A",
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
               }
           );
        }
    }

    public class YourDbContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer("Server=HOANGPHUCSEIZA\\MSSQLSERVER01;Database=SE104_AirlineTicketManage;Trusted_Connection=true");

            return new DataContext(optionsBuilder.Options);
        }
    }
}
