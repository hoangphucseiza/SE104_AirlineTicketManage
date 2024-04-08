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
                    ThoiGianChamNhatDatVe = table.Column<int>(type: "int", nullable: false),
                    ThoiGianHuyDatVe = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
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
                name: "ChuyenBays",
                columns: table => new
                {
                    MaCB = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NgayGio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiGianBay = table.Column<int>(type: "int", nullable: false),
                    GiaVe = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaSanBayDi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SanBay_DiMaSB = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MaSanBayDen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SanBay_DenMaSB = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChuyenBays", x => x.MaCB);
                    table.ForeignKey(
                        name: "FK_ChuyenBays_SanBays_SanBay_DenMaSB",
                        column: x => x.SanBay_DenMaSB,
                        principalTable: "SanBays",
                        principalColumn: "MaSB",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChuyenBays_SanBays_SanBay_DiMaSB",
                        column: x => x.SanBay_DiMaSB,
                        principalTable: "SanBays",
                        principalColumn: "MaSB",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SoSanBayDungs",
                columns: table => new
                {
                    MaSanBayDi = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MaSanBayDen = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SanBay_DiMaSB = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SanBay_DenMaSB = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SoSBDung_Max = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoSanBayDungs", x => new { x.MaSanBayDi, x.MaSanBayDen });
                    table.ForeignKey(
                        name: "FK_SoSanBayDungs_SanBays_SanBay_DenMaSB",
                        column: x => x.SanBay_DenMaSB,
                        principalTable: "SanBays",
                        principalColumn: "MaSB");
                    table.ForeignKey(
                        name: "FK_SoSanBayDungs_SanBays_SanBay_DiMaSB",
                        column: x => x.SanBay_DiMaSB,
                        principalTable: "SanBays",
                        principalColumn: "MaSB");
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

            migrationBuilder.CreateTable(
                name: "VeMayBays",
                columns: table => new
                {
                    MaVe = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ChuyenBayMaCB = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    KhachHangMaKH = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    HangVeMaHV = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    GiaTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NgayDat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayMua = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TrangThai = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VeMayBays", x => x.MaVe);
                    table.ForeignKey(
                        name: "FK_VeMayBays_ChuyenBays_ChuyenBayMaCB",
                        column: x => x.ChuyenBayMaCB,
                        principalTable: "ChuyenBays",
                        principalColumn: "MaCB");
                    table.ForeignKey(
                        name: "FK_VeMayBays_HangVes_HangVeMaHV",
                        column: x => x.HangVeMaHV,
                        principalTable: "HangVes",
                        principalColumn: "MaHV");
                    table.ForeignKey(
                        name: "FK_VeMayBays_KhachHangs_KhachHangMaKH",
                        column: x => x.KhachHangMaKH,
                        principalTable: "KhachHangs",
                        principalColumn: "MaKH");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChuyenBayHangVes_MaCB",
                table: "ChuyenBayHangVes",
                column: "MaCB");

            migrationBuilder.CreateIndex(
                name: "IX_ChuyenBays_SanBay_DenMaSB",
                table: "ChuyenBays",
                column: "SanBay_DenMaSB");

            migrationBuilder.CreateIndex(
                name: "IX_ChuyenBays_SanBay_DiMaSB",
                table: "ChuyenBays",
                column: "SanBay_DiMaSB");

            migrationBuilder.CreateIndex(
                name: "IX_SanBayTrungGians_MaSB",
                table: "SanBayTrungGians",
                column: "MaSB");

            migrationBuilder.CreateIndex(
                name: "IX_SoSanBayDungs_SanBay_DenMaSB",
                table: "SoSanBayDungs",
                column: "SanBay_DenMaSB");

            migrationBuilder.CreateIndex(
                name: "IX_SoSanBayDungs_SanBay_DiMaSB",
                table: "SoSanBayDungs",
                column: "SanBay_DiMaSB");

            migrationBuilder.CreateIndex(
                name: "IX_VeMayBays_ChuyenBayMaCB",
                table: "VeMayBays",
                column: "ChuyenBayMaCB");

            migrationBuilder.CreateIndex(
                name: "IX_VeMayBays_HangVeMaHV",
                table: "VeMayBays",
                column: "HangVeMaHV");

            migrationBuilder.CreateIndex(
                name: "IX_VeMayBays_KhachHangMaKH",
                table: "VeMayBays",
                column: "KhachHangMaKH");
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
                name: "ChuyenBays");

            migrationBuilder.DropTable(
                name: "HangVes");

            migrationBuilder.DropTable(
                name: "KhachHangs");

            migrationBuilder.DropTable(
                name: "SanBays");
        }
    }
}
