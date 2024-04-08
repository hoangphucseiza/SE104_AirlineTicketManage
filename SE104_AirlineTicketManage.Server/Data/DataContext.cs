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

            modelBuilder.Entity<SoSanBayDung>()
                .HasKey(ssbd => new { ssbd.MaSanBayDi, ssbd.MaSanBayDen });
            //modelBuilder.Entity<SoSanBayDung>()
            //    .HasOne(ssbd => ssbd.SanBay_Di)
            //    .WithMany(sb => sb.SoSanBayDungs)
            //    .HasForeignKey(ssbd => ssbd.MaSanBayDi);
            //modelBuilder.Entity<SoSanBayDung>()
            //    .HasOne(ssbd => ssbd.SanBay_Den)
            //    .WithMany(sb => sb.SoSanBayDungs)
            //    .HasForeignKey(ssbd => ssbd.MaSanBayDen);

            modelBuilder.Entity<QuyDinhChung>()
                .HasNoKey();
        }

    }

    public class YourDbContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer("Server=HOANGPHUCSEIZA\\SQLEXPRESS;Database=se104_airlineticketmanage;Trusted_Connection=true");

            return new DataContext(optionsBuilder.Options);
        }
    }
}
