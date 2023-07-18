//khang
// base global variable
let productList = new ProductList()
let cartList = new CartList()
let thongBao = getElement('.thongbao')


// get element 
function getID(id) {
    return document.getElementById(id)
}
function getElement(id) {
    return document.querySelectorAll(id)
}

// ---------------------------//
// hiển
// get API data
function getAPI() {
    var promise = axios({
        url: 'https://649a71a1bf7c145d0238d81a.mockapi.io/CyberPhone',
        method: 'GET'
    })
    promise.then(function (result) {
        productList.arrPd = result.data
        renderListTable()
    })
}
// ---------------------------- //
// hiển
// function render 

function renderListTable() {
    var contentHtml = ''
    for (var i = 0; i < productList.arrPd.length; i++) {
        var prd = productList.arrPd[i]
        contentHtml += `
        <tr>
            <td>${prd.name}</td>
            <td>${prd.maSp}</td>
            <td>${prd.type}</td>
            <td>${prd.desc}</td>
            <td>${prd.price}</td>
            <td>${prd.screen}</td>
            <td>${prd.backCamera}</td>
            <td>${prd.frontCamera}</td>
            <td><img src="${prd.img}" alt=""></td>
            <td>
                <button class="btn btn-info" onclick="productInfoPopup(${prd.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${prd.id})">Delete</button>
            </td>
        </tr>
        `
    }
    getID('admin__tablebody').innerHTML = contentHtml
}
// --------------------//
// API function 

function getProductInfo() {
    var tenSP = getID('tenSp').value
    var maSp = getID('maSp').value
    var typeSP = getID('typeSp').value
    var descSP = getID('descSp').value
    var screenSP = getID('screenSp').value
    var backCameraSP = getID('backCameraSp').value
    var frontCameraSP = getID('frontCameraSp').value
    var priceSP = getID('priceSp').value
    var imgSP = getID('imgSp').value
    var idSP = getID('idSp').value

    var productEdit = new Product(tenSP, priceSP, screenSP, backCameraSP, frontCameraSP, imgSP, descSP, typeSP, idSP, maSp)
    return productEdit
}




//khang
function addProduct() {
    var product1 = getProductInfo()
    var promise = axios({
        url: 'https://649a71a1bf7c145d0238d81a.mockapi.io/CyberPhone',
        method: 'POST',
        data: product1,
    })
    promise
        .then((res) => {
            getAPI()
            renderListTable()
        }
        )
        .catch((err) => console.log(err))
}
//khang
function deleteProduct(id) {
    var promise = axios({
        url: `https://649a71a1bf7c145d0238d81a.mockapi.io/CyberPhone/${id}`,
        method: 'DELETE',
    })
    promise.then((res) => {
        getAPI()
        renderListTable()
    })
    promise.catch((err) => console.log(err))
}

//Hiển  
function productInfoPopup(id) {
    var promise = axios({
        url: `https://649a71a1bf7c145d0238d81a.mockapi.io/CyberPhone/${id}`,
        method: "GET"
    })
    promise.then(res => {
        thongBao.forEach(value => value.style.display = 'none')
        var arrTemp = res.data
        getID('tenSp').value = arrTemp.name

        getID('maSp').value = arrTemp.maSp
        getID('maSp').readOnly = true
        getID('maSp').style.backgroundColor = '#d0cccc'

        getID('typeSp').value = arrTemp.type
        getID('descSp').value = arrTemp.desc
        getID('screenSp').value = arrTemp.screen
        getID('backCameraSp').value = arrTemp.backCamera
        getID('frontCameraSp').value = arrTemp.frontCamera
        getID('priceSp').value = arrTemp.price
        getID('imgSp').value = arrTemp.img
        getID('idSp').value = arrTemp.id
        getID('imgSpan').src = arrTemp.img
    })
        .catch((err) => console.log(err))
}

//Hiển
function editProduct() {
    var product = getProductInfo()
    var promise = axios({
        url: `https://649a71a1bf7c145d0238d81a.mockapi.io/CyberPhone/${product.id}`,
        method: 'PUT',
        data: product
    })
    promise.then(res => {
        getAPI()
        renderListTable()
    })
        .catch(err => console.log('loi'))
}


//-------------------Validation rules----
//khang
//regex
//chỉ chữ và số có khoảng trống
const nameTestReg = /^[a-zA-Z0-9\s]*$/
//chỉ chữ và số không khoảng trống
const maSpTestReg = /^[a-zA-Z0-9]*$/

//validation test function
const lengthTest = function (idTest, idThongbao, messErr) {
    if (getID(idTest).value.trim().length === 0) {
        getID(idThongbao).style.display = 'inline-block'
        getID(idThongbao).innerHTML = messErr
        return false
    } else {
        getID(idThongbao).style.display = 'none'
        return true
    }
}

const patternTest = function (idTest, idThongbao, pattern, messErr) {
    let idTestValue = getID(idTest).value
    if (pattern.test(idTestValue)) {
        getID(idThongbao).style.display = 'none'
        return true
    } else {
        getID(idThongbao).style.display = 'inline-block'
        getID(idThongbao).innerHTML = messErr
        return false
    }
}
//test function
const nameTest = function () {
    let nameLength = lengthTest('tenSp', 'tbTen', '*Tên sản phẩm không được để trống')
    if (nameLength) {
        let namePattern = patternTest('tenSp', 'tbTen', nameTestReg, '*Tên chỉ gồm chữ và số, không có kí tự đặc biệt')
        if (namePattern) {
            return true
        } else return false
    } else return false
}

const maSpTest = function () {
    let maSpLength = lengthTest('maSp', 'tbMasp', '*Mã sản phẩm không được để trống')
    if (maSpLength) {
        let maSpPattern = patternTest('maSp', 'tbMasp', maSpTestReg, '*Mã sản phẩm chỉ gồm chữ và số, không có kí tự đặc biệt và không có khoảng trống')
        if (maSpPattern) {
            return true
        } else return false
    } else return false
}

const typeTest = function () {
    let typeLength = lengthTest('typeSp', 'tbType', '*Loại sản phẩm không được để trống')
    if (typeLength) {
        let typePattern = patternTest('tenSp', 'tbTen', nameTestReg, '*Loại sản phẩm chỉ gồm chữ và số, không có kí tự đặc biệt')
        if (typePattern) {
            return true
        } else return false
    } else return false
}

const priceTest = function () {
    let priceLenght = lengthTest('priceSp', 'tbGia', '*Giá của sản phẩm không được để trống')
    if (priceLenght) {
        let price = getID('priceSp').value * 1
        if (price <= 0) {
            getID('tbGia').style.display = 'inline-block'
            getID('tbGia').innerHTML = 'Giá phải là số hợp lệ'
            return false
        }else return true
    }else return false
}









//--------------------------------
// Admin functions
getAPI()
renderListTable()
getID('admin__modal').onclick = function () {
    thongBao.forEach(value => value.style.display = 'none')
    getID('maSp').readOnly = false
    getID('maSp').style.backgroundColor = 'none'
    getID('admin__form').reset()
    getID('imgSpan').src = ''
}
getID('saveProduct').onclick = function () {
    if (getID('idSp').value === '-1') {
        addProduct()
    } else {
        editProduct()
    }
}