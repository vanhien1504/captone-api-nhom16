//khang
// base global variable
let productList = new ProductList()
let cartList = new CartList()
let thongBao = getElement('.thongbao')

let iconSearch = getID('search__icon')
let inputSearch = getID('search__input')


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
            <td class="fw-bold text-center">${prd.maSp}</td>
            <td>${prd.type}</td>
            <td>${prd.desc}</td>
            <td>$${prd.price}</td>
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
            alert('Thêm sản phẩm thành công')
        }
        )
        .catch((err) => console.log(err))
}
//khang
function deleteProduct(id) {
    let choice = confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')
    if (choice===true){var promise = axios({
        url: `https://649a71a1bf7c145d0238d81a.mockapi.io/CyberPhone/${id}`,
        method: 'DELETE',
    })
    promise.then((res) => {
        getAPI()
        renderListTable()
        alert('Xoá sản phẩm thành công')
    })
    promise.catch((err) => console.log(err))
}}
    

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
        alert('Sửa sản phẩm thành công')

    })
        .catch(err => console.log(err))
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
            let maSpTestValue = getID('maSp').value
            let trung = false
            productList.arrPd.forEach(value => {
                if (value.maSp === maSpTestValue) {
                    trung = true
                }
            })
            if (trung === true) {
                getID('tbMasp').style.display = 'inline-block'
                getID('tbMasp').innerHTML = 'Mã sản phẩm bị trùng. Vui lòng nhập mã khác'
                return false
            } else {
                getID('tbMasp').style.display = 'none'
                return true
            }
            // let promise = axios({
            //     url: 'https://649a71a1bf7c145d0238d81a.mockapi.io/CyberPhone',
            //     method: 'GET',
            // })
            // promise.then(res => {
            //     let maSpTestValue = getID('maSp').value
            //     let trung = false
            //     res.data.forEach(value => {
            //         if (value.maSp === maSpTestValue) {
            //             trung = true
            //         }
            //     })
            // if (trung) {
            //     getID('tbMasp').style.display = 'inline-block'
            //     getID('tbMasp').innerHTML = 'Mã sản phẩm bị trùng. Vui lòng nhập mã khác'
            //     return false
            // } else {
            //     getID('tbMasp').style.display = 'none'
            //     return true
            // }
            // })
            //     .catch(err = console.log(err))
        } else return false
    } else return false
}

const typeTest = function () {
    let typeTest = getID('typeSp').value
    if (typeTest === 'none') {
        getID('tbType').style.display = 'inline-block'
        getID('tbType').innerHTML = 'Vui lòng chọn loại sản phẩm'
        return false
    }else {
        getID('tbType').style.display = 'none'
        return true
    }
}

const priceTest = function () {
    let priceLenght = lengthTest('priceSp', 'tbGia', '*Giá của sản phẩm không được để trống')
    if (priceLenght) {
        let price = getID('priceSp').value * 1
        if (price <= 0) {
            getID('tbGia').style.display = 'inline-block'
            getID('tbGia').innerHTML = 'Giá phải là số hợp lệ'
            return false
        } else return true
    } else return false
}


const descTest = function () {
    let descLength = lengthTest('descSp', 'tbMota', '*Mô tả của sản phẩm không được để trống')
    if (descLength) {
        return true
    } else return false
}

const screenTest = function () {
    let screenLenght = lengthTest('screenSp', 'tbScreen', '*Camera sau của sản phẩm không được để trống')
    if (screenLenght) {
        return true
    } else return false
}


const backCameraTest = function () {
    let bcLenght = lengthTest('backCameraSp', 'tbCamsau', '*Camera sau của sản phẩm không được để trống')
    if (bcLenght) {
        return true
    } else return false
}

const frontCameraTest = function () {
    let fcLenght = lengthTest('frontCameraSp', 'tbCamtruoc', '*Camera trước của sản phẩm không được để trống')
    if (fcLenght) {
        return true
    } else return false
}

//---------Search------
//Hiển
iconSearch.onclick = () => {
    inputSearch.value = ''
    getID('head__search').innerHTML = ''

}

inputSearch.addEventListener('keyup', () => {
    let valueSearch = inputSearch.value.replace(/\s/g, '').toUpperCase()
    let contentHtml = ''
    for (let i = 0; i < productList.arrPd.length; i++) {
        if (valueSearch === '') {
            getID('search__result').innerHTML = ''
            getID('head__search').innerHTML = ''
        } else {
            getID('head__search').innerHTML = 'Sản phẩm gợi ý'
            let prd = productList.arrPd[i]
            let prdName = prd.name.replace(/\s/g, '').toUpperCase()
            if (prdName.indexOf(valueSearch) !== -1) {
                contentHtml += `
                <tr data-bs-toggle="modal" data-bs-target="#product__modal" onclick="renderProduct('${prd.maSp}')">
                    <td>${prd.name}</td>
                </tr>
                `}
        }
        getID('search__result').innerHTML = contentHtml
    }

})



//--------------------------------
// Admin functions
getAPI()
renderListTable()
getID('admin__modal').onclick = function () {
    thongBao.forEach(value => value.style.display = 'none')
    getID('maSp').readOnly = false
    getID('maSp').style='background-color: none;'
    getID('admin__form').reset()
    getID('imgSpan').src = ''
}
getID('saveProduct').onclick = function () {
    if (getID('idSp').value === '-1') {
        if (nameTest() && maSpTest() && typeTest() && descTest() && screenTest() && backCameraTest() && frontCameraTest() && priceTest()) {
            addProduct()
        }
    } else {
        if (nameTest() && typeTest() && descTest() && screenTest() && backCameraTest() && frontCameraTest() && priceTest()) {
            editProduct()
        }
    }

}


//--------------------
//runtime validation

//ten
getID('tenSp').onblur = function () {
    nameTest();
}
//Ma san pham
getID('maSp').onblur = function () {
    maSpTest()
}
//Loai san pham
getID('typeSp').onchange = function () {
    typeTest()
}
//Mo ta san pham
getID('descSp').onblur = function () {
    descTest()
}

//Man hinh
getID('screenSp').onblur = function () {
    screenTest()
}

//Camera sau
getID('backCameraSp').onblur = function () {
    backCameraTest()
}

//Camera truoc
getID('frontCameraSp').onblur = function () {
    frontCameraTest()
}

//Gia san pham
getID('priceSp').onblur = function () {
    priceTest()
}

//Hinh san pham
getID('imgSp').onblur = function () {
    let hinhtest = lengthTest('imgSp', 'tbImg', '*Nhập link hình ảnh sản phẩm')
    if (hinhtest) {
        getID('imgSpan').src = getID('imgSp').value
    }

}