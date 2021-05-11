const data = {
    city: [
        'самара'
    ],
    link: [
        'https://www.citilink.ru/catalog/igrovye-pristavki/?f=discount.any&pf=discount.any&pprice_min=40000&price_min=15000'
    ],
    keywords: [
        'playstation',
        'series',
        'коралловый'
    ]
}
//let arr = [
//    'http://P8B1byap:5iRWcGrQ@193.187.106.245:63857',
//    'http://P8B1byap:5iRWcGrQ@45.143.142.52:48036',
//    'http://P8B1byap:5iRWcGrQ@46.150.246.156:48916',
//    'http://P8B1byap:5iRWcGrQ@212.60.7.241:51102',
//    'http://P8B1byap:5iRWcGrQ@46.150.247.13:51118'
//]

const getProducts = require('./getProducts.js')
var getNewConection = require('./getNewConection.js')


async function go() {
    let connection = await getNewConection(data.link[0], data.city)
    await getProducts(connection, data.link[0], data.keywords, data.city)
    await page.waitForTimeout(1000)

}

go()