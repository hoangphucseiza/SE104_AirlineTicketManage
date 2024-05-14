using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SE104_AirlineTicketManage.Server.Migrations
{
    public partial class initial : Migration
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
                    SoSBDung_Max = table.Column<int>(type: "int", nullable: false),
                    ThoiGianBayToiThieu = table.Column<int>(type: "int", nullable: false)
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
                    NgayMua = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                values: new object[,]
                {
                    { "CB01", 1000000m, "SB02", "SB01", new DateTime(2021, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 },
                    { "CB02", 1000000m, "SB03", "SB02", new DateTime(2021, 12, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 },
                    { "CB03", 1000000m, "SB04", "SB03", new DateTime(2021, 12, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 },
                    { "CB04", 1000000m, "SB05", "SB04", new DateTime(2021, 12, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 },
                    { "CB05", 1000000m, "SB06", "SB05", new DateTime(2021, 12, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 },
                    { "CB06", 1000000m, "SB07", "SB06", new DateTime(2021, 12, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 },
                    { "CB07", 1000000m, "SB08", "SB07", new DateTime(2021, 12, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 },
                    { "CB08", 1000000m, "SB09", "SB08", new DateTime(2021, 12, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 },
                    { "CB09", 1000000m, "SB10", "SB09", new DateTime(2021, 12, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 120 }
                });

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
                values: new object[,]
                {
                    { "KH01", "123456789", "0123456780", "Nguyen Van A" },
                    { "KH02", "987654321", "0123456781", "Nguyen Van B" },
                    { "KH03", "456789123", "0123456782", "Nguyen Van C" },
                    { "KH04", "321654987", "0123456783", "Nguyen Van D" },
                    { "KH05", "789123456", "0123456784", "Nguyen Van E" },
                    { "KH06", "654987321", "0123456785", "Nguyen Van F" },
                    { "KH07", "123789456", "0123456786", "Nguyen Van G" },
                    { "KH08", "987123654", "0123456787", "Nguyen Van H" },
                    { "KH09", "456123789", "0123456788", "Nguyen Van I" },
                    { "KH10", "321987654", "0123456789", "Nguyen Van K" }
                });

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
                    { "SB02", 60, 30, "Tan Son Nhat", "Ho Chi Minh" },
                    { "SB03", 60, 30, "Da Nang", "Da Nang" },
                    { "SB04", 60, 30, "Cam Ranh", "Khanh Hoa" },
                    { "SB05", 60, 30, "Phu Quoc", "Kien Giang" },
                    { "SB06", 60, 30, "Can Tho", "Can Tho" },
                    { "SB07", 60, 30, "Buon Ma Thuot", "Dak Lak" },
                    { "SB08", 60, 30, "Pleiku", "Gia Lai" },
                    { "SB09", 60, 30, "Vinh", "Nghe An" },
                    { "SB10", 60, 30, "Hue", "Thua Thien Hue" },
                    { "SB11", 60, 30, "Hai Phong", "Hai Phong" },
                    { "SB12", 60, 30, "Dong Hoi", "Quang Binh" },
                    { "SB13", 60, 30, "Rach Gia", "Kien Giang" },
                    { "SB14", 60, 30, "Con Dao", "Ba Ria - Vung Tau" },
                    { "SB15", 60, 30, "Ca Mau", "Ca Mau" },
                    { "SB16", 60, 30, "Quy Nhon", "Binh Dinh" },
                    { "SB17", 60, 30, "Tuy Hoa", "Phu Yen" },
                    { "SB18", 60, 30, "Phu Cat", "Binh Dinh" },
                    { "SB19", 60, 30, "Dien Bien", "Dien Bien" },
                    { "SB20", 60, 30, "Chu Lai", "Quảng nam" }
                });

            migrationBuilder.InsertData(
                table: "SoSanBayDungs",
                columns: new[] { "MaSanBayDen", "MaSanBayDi", "SoSBDung_Max", "ThoiGianBayToiThieu" },
                values: new object[,]
                {
                    { "SB02", "SB01", 1, 120 },
                    { "SB03", "SB01", 1, 120 },
                    { "SB04", "SB01", 1, 120 },
                    { "SB05", "SB01", 1, 120 },
                    { "SB06", "SB01", 1, 120 },
                    { "SB07", "SB01", 1, 120 },
                    { "SB08", "SB01", 1, 120 },
                    { "SB09", "SB01", 1, 120 },
                    { "SB10", "SB01", 1, 120 },
                    { "SB03", "SB02", 1, 120 },
                    { "SB04", "SB02", 1, 120 },
                    { "SB05", "SB02", 1, 120 },
                    { "SB06", "SB02", 1, 120 }
                });

            migrationBuilder.InsertData(
                table: "ChuyenBayHangVes",
                columns: new[] { "MaCB", "MaHV", "SoLuong" },
                values: new object[,]
                {
                    { "CB01", "HV01", 50 },
                    { "CB02", "HV01", 50 },
                    { "CB03", "HV01", 50 },
                    { "CB04", "HV01", 50 },
                    { "CB05", "HV01", 50 },
                    { "CB06", "HV01", 50 },
                    { "CB07", "HV01", 50 },
                    { "CB08", "HV01", 50 },
                    { "CB09", "HV01", 50 },
                    { "CB01", "HV02", 50 },
                    { "CB02", "HV02", 50 },
                    { "CB03", "HV02", 50 },
                    { "CB04", "HV02", 50 },
                    { "CB05", "HV02", 50 },
                    { "CB06", "HV02", 50 },
                    { "CB07", "HV02", 50 },
                    { "CB08", "HV02", 50 },
                    { "CB09", "HV02", 50 }
                });

            migrationBuilder.InsertData(
                table: "SanBayTrungGians",
                columns: new[] { "MaCB", "MaSB", "GhiChu", "TGDung" },
                values: new object[,]
                {
                    { "CB01", "SB01", "Ghi chu 1", 45 },
                    { "CB01", "SB02", "Ghi chu 2", 45 },
                    { "CB02", "SB02", "Ghi chu 3", 45 },
                    { "CB02", "SB03", "Ghi chu 4", 45 },
                    { "CB03", "SB03", "Ghi chu 5", 45 },
                    { "CB03", "SB04", "Ghi chu 6", 45 },
                    { "CB04", "SB04", "Ghi chu 7", 45 },
                    { "CB04", "SB05", "Ghi chu 8", 45 },
                    { "CB05", "SB05", "Ghi chu 9", 45 },
                    { "CB05", "SB06", "Ghi chu 10", 45 },
                    { "CB06", "SB06", "Ghi chu 11", 45 },
                    { "CB06", "SB07", "Ghi chu 12", 45 },
                    { "CB07", "SB07", "Ghi chu 13", 45 },
                    { "CB07", "SB08", "Ghi chu 14", 45 },
                    { "CB08", "SB08", "Ghi chu 15", 45 },
                    { "CB08", "SB09", "Ghi chu 16", 45 },
                    { "CB09", "SB09", "Ghi chu 17", 45 },
                    { "CB09", "SB10", "Ghi chu 18", 45 }
                });

            migrationBuilder.InsertData(
                table: "VeMayBays",
                columns: new[] { "MaVe", "GiaTien", "MaCB", "MaHV", "MaKH", "NgayDat", "NgayMua", "TrangThai" },
                values: new object[,]
                {
                    { "VMB01", 1500000m, "CB01", "HV01", "KH01", new DateTime(2021, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Đã mua" },
                    { "VMB02", 1000000m, "CB01", "HV02", "KH02", new DateTime(2021, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Chưa Thanh Toán" },
                    { "VMB03", 1500000m, "CB02", "HV01", "KH03", new DateTime(2021, 11, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Đã mua" },
                    { "VMB04", 1000000m, "CB02", "HV02", "KH04", new DateTime(2021, 11, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Chưa Thanh Toán" },
                    { "VMB05", 1500000m, "CB03", "HV01", "KH05", new DateTime(2021, 11, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "Đã mua" },
                    { "VMB06", 1000000m, "CB03", "HV02", "KH06", new DateTime(2021, 11, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Chưa Thanh Toán" }
                });

            migrationBuilder.InsertData(
                table: "VeMayBays",
                columns: new[] { "MaVe", "GiaTien", "MaCB", "MaHV", "MaKH", "NgayDat", "NgayMua", "TrangThai" },
                values: new object[] { "VMB07", 1500000m, "CB04", "HV01", "KH07", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Đã mua" });

            migrationBuilder.InsertData(
                table: "VeMayBays",
                columns: new[] { "MaVe", "GiaTien", "MaCB", "MaHV", "MaKH", "NgayDat", "NgayMua", "TrangThai" },
                values: new object[] { "VMB08", 1000000m, "CB04", "HV02", "KH08", new DateTime(2021, 11, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Chưa Thanh Toán" });

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
