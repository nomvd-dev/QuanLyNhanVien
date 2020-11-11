var Validation = function() {
    this.kiemTraTatCaSo = function(value,name,selectorError){
        var regexSo =  /^[0-9]+$/;
        if (!regexSo.test(value)){
            document.querySelector(selectorError).innerHTML = name + ' chỉ gồm số!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraTatCaKyTu = function(value,name,selectorError){
        var regexKyTu = /^[A-Za-z ]+$/;
        if (!regexKyTu.test(value)){
            document.querySelector(selectorError).innerHTML = name + ' chỉ gồm ký tự!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraSoLuongKyTu = function(value,name,selectorError, minChar, maxChar){
        var len = value.length;
        if (Number(len) < minChar || Number(len) > maxChar){
            document.querySelector(selectorError).innerHTML = name + ` từ ${minChar} đến ${maxChar} ký số!`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraMucLuong = function(value,name,selectorError, minChar, maxChar){
        if (Number(value) < minChar || Number(value) > maxChar){
            document.querySelector(selectorError).innerHTML = name + ` từ ${minChar} đến ${maxChar} đồng!`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraSoGioLam = function(value,name,selectorError, minChar, maxChar){
        if (Number(value) < minChar || Number(value) > maxChar){
            document.querySelector(selectorError).innerHTML = name + ` từ ${minChar} đến ${maxChar} giờ!`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}