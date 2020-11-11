
//console.log(axios);
var service = new NhanVienService();

var mangNhanVien = [];
var getValid = function (validate, nv) {
    var valid = validate.kiemTraTatCaSo(nv.maNhanVien, 'Mã nhân viên', '.kiemTraTatCaSo-maNhanVien')
        & validate.kiemTraSoLuongKyTu(nv.maNhanVien, 'Mã nhân viên', '.kiemTraSoLuongKyTu-maNhanVien', 4, 6);

    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraTatCaChu-tenNhanVien');

    valid &= validate.kiemTraTatCaSo(nv.luongCoBan, 'Lương cơ bản', '.kiemTraTatCaSo-luongCoBan')
        & validate.kiemTraMucLuong(nv.luongCoBan, 'Lương cơ bản', '.kiemTraLuongCoBan', 1000000, 20000000);

    valid &= validate.kiemTraTatCaSo(nv.soGioLamTrongThang, 'Số giờ làm trong tháng', '.kiemTraTatCaSo-soGioLam')
        & validate.kiemTraSoGioLam(nv.soGioLamTrongThang, 'Số giờ làm trong tháng', '.kiemTraSoGioLam', 50, 150);
    return valid;
}



//Định nghĩa sự kiện click khi người dùng bấm nút xác nhận
document.querySelector('#btnThemNhanVien').onclick = function () {
    //Tạo ra đối tượng sinh viên chứa thông tin người dùng nhập vào từ giao diện
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLam').value;

    var tagChucVu = document.querySelector('#chucVu');
    console.log(tagChucVu.options);
    var arrayOption = tagChucVu.options;
    nv.chucVu = arrayOption[tagChucVu.options.selectedIndex].innerHTML;


    var validate = new Validation();
    var valid = getValid(validate, nv);
    if (!valid) {
        return;
    }
    var promise = service.themNhanVien(nv);

    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVien();
    });

    promise.catch(function (error) {
        console.log(error.response.data);
    });
    mangNhanVien.push(nv);

    renderTable(mangNhanVien);

    luuLocalStorage();
}


var renderTable = function (arrNV) {
    var noiDungTable = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nVien = arrNV[index];
        var nv = new NhanVien();
        nv.maNhanVien = nVien.maNhanVien;
        nv.tenNhanVien = nVien.tenNhanVien;
        nv.chucVu = nVien.chucVu;
        nv.luongCoBan = nVien.luongCoBan;
        nv.soGioLamTrongThang = nVien.soGioLamTrongThang;
        nv.heSoChucVu = nVien.heSoChucVu;
        noiDungTable += `
                <tr>
                    <td>${nv.maNhanVien}</td>
                    <td>${nv.tenNhanVien}</td>
                    <td>${nv.chucVu}</td>
                    <td>${nv.luongCoBan}</td>
                    <td>${nv.tinhLuong()}</td>
                    <td>${nv.soGioLamTrongThang}</td>
                    <td>${nv.xepLoaiNhanVien()}</td>
                    <td><button class="btn btn-danger " onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button></td>
                    <td><button class="btn btn-primary " onclick="chinhSuaNhanVien('${nv.maNhanVien}')">Chỉnh Sửa</button></td>
                </tr>            
        `
    }
    console.log(noiDungTable);
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}

var layDanhSachNhanVien = function () {
    var promise = service.layThongTinNhanVien();

    promise.then(function (result) {
        console.log('Ket Qua', result.data);
        renderTable(result.data);
    });

    promise.catch(function (error) {
        console.log(error);
    });
}
layDanhSachNhanVien();

var xoaNhanVien = function (maNV) {
    var promise = service.xoaNhanVien(maNV);

    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVien();
    });

    promise.catch(function (error) {
        console.log(error.response.data);
    });
}
var chinhSuaNhanVien = function (maNhanVien) {
    document.querySelector('#maNhanVien').disabled = true;
    var promise = service.suaNhanVien(maNhanVien);
    promise.then(function (result) {
        console.log(result.data);
        var nv = result.data;
        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#chucVu').value = nv.heSoChucVu;
        document.querySelector('#luongCoBan').value = nv.luongCoBan;
        document.querySelector('#soGioLam').value = nv.soGioLamTrongThang;
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    });
}

document.querySelector('#btnLuuThongTin').onclick = function () {
    // var value = document.querySelector('#maNhanVien').value;
    var validate = new Validation();

    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLam').value;

    var tagChucVu = document.querySelector('#chucVu');
    console.log(tagChucVu.options);
    var arrayOption = tagChucVu.options;
    nv.chucVu = arrayOption[tagChucVu.options.selectedIndex].innerHTML;

    var valid = getValid(validate, nv);
    if (!valid) {
        return;
    }

    var promise = service.luuThongTin(nv.maNhanVien, nv);
    promise.then(function(result){
        console.log(result.data);
        layDanhSachNhanVien();
    });

    promise.catch(function(error){
        console.log(error.response.data);
    });
    document.querySelector('#maNhanVien').disabled = false;
    renderTable(mangNhanVien);
    luuLocalStorage();
}

var luuLocalStorage = function () {
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}

var layLocalStorage = function () {
    if (localStorage.getItem('mangNhanVien')) {
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        mangNhanVien = JSON.parse(sMangNhanVien);
        renderTable(mangNhanVien);
    }
}

layLocalStorage();