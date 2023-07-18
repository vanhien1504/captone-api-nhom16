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