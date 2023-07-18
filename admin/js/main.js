

// -------------------------------------//
//Local function 
// hiển
const getLocalCart = function () {
    const data2 = localStorage.getItem('LocalCartList')
    const parseData = JSON.parse(data2)
    const arrParse = []
    parseData.forEach(value => {
        const cartItem = new CartItem(value.name, value.price*1, value.img, value.soLuong, value.screen, value.backCamera, value.frontCamera, value.desc, value.id, value.maSp)
        arrParse.push(cartItem)
    })
    return arrParse
}

const updateLocal = function () {
    const data = JSON.stringify(cartList.arrCart)
    localStorage.setItem('LocalCartList', data)
}

// --------------------------------------//
//Render function 
// hiển
const renderList = function (id, renderType = 1) {
    let contentHtml = ''
    productList.arrPd.forEach((value) => {
        contentHtml += `
        <div class="product${renderType}" >
            <div class="product__content">
                <div class="product__title">
                    <h1>${value.name}</h1>
                </div>    
                <img src="${value.img}"
                alt="" data-bs-toggle="modal" data-bs-target="#product__modal" onclick="renderProduct('${value.maSp}')">
                <div class="productDesc">
                    <h2>$${value.price}</h2>
                    <p>${value.desc}</p>
                </div>
                <button class="btn btn-dark" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                    onclick="addSl('${value.maSp}')">Add to cart</button>
            </div>
        </div>
            `
    })
    getID(id).innerHTML = contentHtml
    // console.log(contentHtml);

}
//hiển
const selectRender = function (id, renderType) {
    let contentHtml = ''
    if (getID('phoneType').value === 'None') {
        renderList(id, renderType)
    } else {
        productList.arrPd.forEach((value) => {
            if (value.type.toUpperCase() == getID('phoneType').value.toUpperCase()) {
                contentHtml += `
                <div class="product${renderType}">
                <div class="product__content">
                    <div class="product__title">
                        <h1>${value.name}</h1>
                    </div>    
                    <img src="${value.img}"
                    alt="">
                    <div class="productDesc">
                        <h2>Giá: $${value.price}</h2>
                        <p>${value.desc}</p>
                    </div>
                    <button class="btn btn-dark" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                        onclick="addSl('${value.maSp}')">Add to cart</button>
                </div>
            </div>
            `
            }
        })
        getID(id).innerHTML = contentHtml
    }
}

//Hiển
const renderProduct = function (maSP) {
    cartList.arrCart.forEach(value => {
        if (value.maSp == maSP) {
            getID('product__modal__content').innerHTML = `
            <div class="prdModalContent">
            <div class="prdImg">
                <img src="${value.img}" id="prdImg" alt="">
            </div>
            <div class="prdInfo">
                <h2 id="prdName">${value.name}</h2>
                <p id="prdDesc">${value.desc}</p>
                <p><i class="fa-solid fa-circle"></i><span id="prdScreen">${value.screen}</span></p>
                <p><i class="fa-solid fa-circle"></i><span id="prdBackCam">${value.backCamera}</span></p>
                <p><i class="fa-solid fa-circle"></i><span id="prdFrontCam">${value.frontCamera}</span></p>
                
            </div>
        </div>
        <div class="prdCart">
            <span id="prdPrice">$${value.price}</span>
            <button class="btn btn-dark" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                    onclick="addSl('${value.maSp}')">Add to cart</button>
        </div>
            `
        }
    })
}


//Hiển
const renderCart = function () {
    cartList.arrCart = getLocalCart()
    let contentHtml = ''
    cartList.arrCart.forEach(value => {
        if (value.soLuong != 0) {
            contentHtml += `
        <tr>
            <td>${value.name}</td>
            <td>$ ${value.price.toLocaleString({style:"currency", currency:"USD"})}</td>
            <td>  <input type="number" value="${value.soLuong}" id="${value.maSp}" onchange ="changeSl('${value.maSp}')" ></td>
        </tr>
        `}
    })
    getID('totalMoney').innerHTML = `$ ${cartList.totalMoney().toLocaleString({style:"currency", currency:"USD"})}`
    getID('cartContent').innerHTML = contentHtml
    getID('thanhtoan__status').style.display ='none'
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







//MAIN CODE 

getAPI()
getAPIGrid()
createCartList()
cartList.arrCart = getLocalCart()
getID('itemCount').innerHTML = cartList.totalItems()

getID('showCart').onclick = function () {
    cartList.arrCart = getLocalCart()
    renderCart()
}
getID('purchase').onclick = function () {
    cartList.arrCart.forEach(value => {
        value.soLuong = 0
    })
    getID('infoTT').innerHTML = 'cam on da thanh toan'
    updateLocal()
}


