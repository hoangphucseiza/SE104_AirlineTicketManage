﻿using SE104_AirlineTicketManage.Server.Dto;
using SE104_AirlineTicketManage.Server.Models;

namespace SE104_AirlineTicketManage.Server.Interfaces
{
    public interface IKhachHangRepository
    {
        ICollection<KhachHang> GetKhachHangs();
        KhachHang GetKhachHang(string maKH);

        bool KhachHangExists(string maKH);

        KhachHang GetKhachHangByMaKH(string maKH);
        KhachHang GetKhachHangBySDT(string sdt);
        KhachHang GetKhachHangByCCCD(string cccd);
        GetDetailKhachHangDto GetKhachHangDetail(string maKH);
        ICollection<KhachHang> GetDanhSachKhachHang(int phantrang);
        bool KhachHangSDTExists(string sdt);
        bool KhachHangCCCDExists(string cccd);

        bool CreateKhachHang();
        bool Save();
    }
}
