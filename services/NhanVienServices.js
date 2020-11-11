var NhanVienService = function(){
    this.layThongTinNhanVien = function(){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
            method: 'GET'
        });
        return promise;
    }
    this.themNhanVien = function(nv){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',
            data: nv
        });
        return promise;
    }
    this.xoaNhanVien = function(maNhanVien){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNhanVien,
            method: 'DELETE',
        })
        return promise;
    }
    this.suaNhanVien = function(maNhanVien){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNhanVien,
            method: 'GET',
        })
        return promise;
    }
    this.luuThongTin = function(maNhanVien, nv){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=' + maNhanVien,
            method: 'PUT',
            data: nv
        });
        return promise;
    };
}