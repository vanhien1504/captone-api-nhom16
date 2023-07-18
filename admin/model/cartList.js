function CartList() {
    this.arrCart = []
    this.addCart = function (cartItem) {
        this.arrCart.push(cartItem)
    }
    this.totalMoney = function () {
        let sum = 0
        this.arrCart.forEach(value => {
            sum += value.soLuong*value.price
        })
        return sum
    }
    this.totalItems = ()=>{
        let items = 0
        this.arrCart.forEach(value => {
            items += value.soLuong*1
        })
        return items
    }
}