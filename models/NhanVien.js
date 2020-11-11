var NhanVien = function(){
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.chucVu = '';
    this.heSoChucVu = '';
    this.luongCoBan = '';
    this.soGioLamTrongThang = '';
    this.tinhLuong = function(){
        return this.heSoChucVu * this.luongCoBan;
    }
    this.xepLoaiNhanVien = function(){
        if (this.soGioLamTrongThang >= 120) {
            return "Nhân Viên Xuất Sắc";
        }
        else if (this.soGioLamTrongThang >= 100) {
            return "Nhân Viên Giỏi";
        }
        else if (this.soGioLamTrongThang >= 80) {
            return "Nhân Viên Khá";
        }
        else if (this.soGioLamTrongThang >= 50) {
            return "Nhân Viên Trung Bình";
        }
        else {
            return "Không Xác Định";
        }
    }
}