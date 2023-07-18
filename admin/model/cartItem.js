function CartItem(_name, _price, _img, _soLuong, _screen, _backCamera, _frontCamera, _desc, _id, _maSp) {
    this.name = _name
    this.price = _price
    this.img = _img
    this.desc = _desc
    this.soLuong = _soLuong
    this.screen = _screen
    this.backCamera = _backCamera
    this.frontCamera = _frontCamera
    this.id = _id
    this.maSp = _maSp

    this.giaTien = function () {
        return this.price * this.soLuong
    }

}