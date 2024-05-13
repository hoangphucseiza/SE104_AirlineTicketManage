using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SE104_AirlineTicketManage.Server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChuyenBays",
                columns: table => new
                {
                    MaCB = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NgayGio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiGianBay = table.Column<int>(type: "int", nullable: false),
                    GiaVe = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaSB_Di = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaSB_Den = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChuyenBays", x => x.MaCB);
                });

            migrationBuilder.CreateTable(
                name: "HangVes",
                columns: table => new
                {
                    MaHV = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenHV = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TiLe_Gia = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HangVes", x => x.MaHV);
                });

            migrationBuilder.CreateTable(
                name: "KhachHangs",
                columns: table => new
                {
                    MaKH = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenKH = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CMND = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SDT = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhachHangs", x => x.MaKH);
                });

            migrationBuilder.CreateTable(
                name: "QuyDinhChungs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ThoiGianChamNhatDatVe = table.Column<int>(type: "int", nullable: false),
                    ThoiGianHuyDatVe = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuyDinhChungs", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SanBays",
                columns: table => new
                {
                    MaSB = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenSB = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TGDungMin = table.Column<int>(type: "int", nullable: false),
                    TGDungMax = table.Column<int>(type: "int", nullable: false),
                    ViTri = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanBays", x => x.MaSB);
                });

            migrationBuilder.CreateTable(
                name: "SoSanBayDungs",
                columns: table => new
                {
                    MaSanBayDi = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MaSanBayDen = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SoSBDung_Max = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoSanBayDungs", x => new { x.MaSanBayDi, x.MaSanBayDen });
                });

            migrationBuilder.CreateTable(
                name: "ChuyenBayHangVes",
                columns: table => new
                {
                    MaCB = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MaHV = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChuyenBayHangVes", x => new { x.MaHV, x.MaCB });
                    table.ForeignKey(
                        name: "FK_ChuyenBayHangVes_ChuyenBays_MaCB",
                        column: x => x.MaCB,
                        principalTable: "ChuyenBays",
                        principalColumn: "MaCB",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChuyenBayHangVes_HangVes_MaHV",
                        column: x => x.MaHV,
                        principalTable: "HangVes",
                        principalColumn: "MaHV",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VeMayBays",
                columns: table => new
                {
                    MaVe = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MaCB = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MaKH = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MaHV = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    GiaTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NgayDat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayMua = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TrangThai = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VeMayBays", x => x.MaVe);
                    table.ForeignKey(
                        name: "FK_VeMayBays_ChuyenBays_MaCB",
                        column: x => x.MaCB,
                        principalTable: "ChuyenBays",
                        principalColumn: "MaCB",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VeMayBays_HangVes_MaHV",
                        column: x => x.MaHV,
                        principalTable: "HangVes",
                        principalColumn: "MaHV",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VeMayBays_KhachHangs_MaKH",
                        column: x => x.MaKH,
                        principalTable: "KhachHangs",
                        principalColumn: "MaKH",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SanBayTrungGians",
                columns: table => new
                {
                    MaCB = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MaSB = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TGDung = table.Column<int>(type: "int", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanBayTrungGians", x => new { x.MaCB, x.MaSB });
                    table.ForeignKey(
                        name: "FK_SanBayTrungGians_ChuyenBays_MaCB",
                        column: x => x.MaCB,
                        principalTable: "ChuyenBays",
                        principalColumn: "MaCB",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SanBayTrungGians_SanBays_MaSB",
                        column: x => x.MaSB,
                        principalTable: "SanBays",
                        principalColumn: "MaSB",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ChuyenBays",
                columns: new[] { "MaCB", "GiaVe", "MaSB_Den", "MaSB_Di", "NgayGio", "ThoiGianBay" },
                values: new object[] { "CB01", 1000000m, "SB02", "SB01", new DateTime(2021, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 });

            migrationBuilder.InsertData(
                table: "HangVes",
                columns: new[] { "MaHV", "TenHV", "TiLe_Gia" },
                values: new object[,]
                {
                    { "HV01", "Hang thuong gia", 1.5 },
                    { "HV02", "Hang pho thong", 1.0 }
                });

            migrationBuilder.InsertData(
                table: "KhachHangs",
                columns: new[] { "MaKH", "CMND", "SDT", "TenKH" },
                values: new object[] { "KH01", "123456789", "0123456789", "Nguyen Van A" });

            migrationBuilder.InsertData(
                table: "QuyDinhChungs",
                columns: new[] { "ID", "ThoiGianChamNhatDatVe", "ThoiGianHuyDatVe" },
                values: new object[] { 1, 30, 3 });

            migrationBuilder.InsertData(
                table: "SanBays",
                columns: new[] { "MaSB", "TGDungMax", "TGDungMin", "TenSB", "ViTri" },
                values: new object[,]
                {
                    { "SB01", 60, 30, "Noi Bai", "Ha Noi" },
                    { "SB02", 60, 30, "Tan Son Nhat", "Ho Chi Minh" }
                });

            migrationBuilder.InsertData(
                table: "SoSanBayDungs",
                columns: new[] { "MaSanBayDen", "MaSanBayDi", "SoSBDung_Max" },
                values: new object[] { "SB02", "SB01", 1 });

            migrationBuilder.InsertData(
                table: "ChuyenBayHangVes",
                columns: new[] { "MaCB", "MaHV", "SoLuong" },
                values: new object[] { "CB01", "HV01", 100 });

            migrationBuilder.InsertData(
                table: "SanBayTrungGians",
                columns: new[] { "MaCB", "MaSB", "GhiChu", "TGDung" },
                values: new object[] { "CB01", "SB01", "Ghi chu 1", 45 });

            migrationBuilder.InsertData(
                table: "VeMayBays",
                columns: new[] { "MaVe", "GiaTien", "MaCB", "MaHV", "MaKH", "NgayDat", "NgayMua", "TrangThai" },
                values: new object[] { "VMB01", 1500000m, "CB01", "HV01", "KH01", new DateTime(2021, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Da mua" });

            migrationBuilder.CreateIndex(
                name: "IX_ChuyenBayHangVes_MaCB",
                table: "ChuyenBayHangVes",
                column: "MaCB");

            migrationBuilder.CreateIndex(
                name: "IX_SanBayTrungGians_MaSB",
                table: "SanBayTrungGians",
                column: "MaSB");

            migrationBuilder.CreateIndex(
                name: "IX_VeMayBays_MaCB",
                table: "VeMayBays",
                column: "MaCB");

            migrationBuilder.CreateIndex(
                name: "IX_VeMayBays_MaHV",
                table: "VeMayBays",
                column: "MaHV");

            migrationBuilder.CreateIndex(
                name: "IX_VeMayBays_MaKH",
                table: "VeMayBays",
                column: "MaKH");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChuyenBayHangVes");

            migrationBuilder.DropTable(
                name: "QuyDinhChungs");

            migrationBuilder.DropTable(
                name: "SanBayTrungGians");

            migrationBuilder.DropTable(
                name: "SoSanBayDungs");

            migrationBuilder.DropTable(
                name: "VeMayBays");

            migrationBuilder.DropTable(
                name: "SanBays");

            migrationBuilder.DropTable(
                name: "ChuyenBays");

            migrationBuilder.DropTable(
                name: "HangVes");

            migrationBuilder.DropTable(
                name: "KhachHangs");
        }
    }
}
