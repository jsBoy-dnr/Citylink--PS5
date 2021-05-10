const jsdom = require("jsdom")
var getNewConection = require('./getNewConection.js')
const { JSDOM } = jsdom
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
async function getProducts(connection, link, keywords, city) {
    let condition = true
    let i = randomInteger(30, 50)
    let p = 0;
    while (condition) {
    let html = await connection.page.content()
    let dom = new JSDOM(html)
    console.log('Забираю и анализирую товары');
    if(dom.window.document.querySelectorAll('section.GroupGrid')) {
        let ProductsList = dom.window.document.querySelectorAll('section.GroupGrid .product_data__pageevents-js')
        console.log('Обнаружил - '+ProductsList.length+' товара');
        ProductsList.forEach(function (item, i, arr) {
            let productName = item.querySelector('a.ProductCardVertical__name').textContent
            if (productName != '') {
                keywords.forEach(function (keyword, p, arrkeys) {
                    if (productName.indexOf(keyword) >= 0) {
                        console.log('Нужный товар найден!!');
                        console.log(productName);
                        console.log(item.querySelector('a.ProductCardVertical__name').href);
                        console.log('----------');
                    }
                })
            }
        })
    } else {
        condition = false
        console.log('БАН!!!!!!!!');
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Закончил анализ');
    await connection.page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    p++
        if(p==i) { condition = false}
    }
    await connection.browser.close();
    connection = await getNewConection(link, city)
    await getProducts(connection, link, keywords, city)
}
module.exports = getProducts;