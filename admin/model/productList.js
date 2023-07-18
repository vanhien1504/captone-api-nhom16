function ProductList() {
    this.arrPd = []

    this.addPd = function (product) {
        this.arrPd.push(product)
    }
    

    this.timID = function (id) {
        var index =-1
        for (var i = 0; i < this.arrPd.length; i++){
            if(this.arrPd[i].id === id ){
                index = i
                break
            }
        }
        return index
    }
}