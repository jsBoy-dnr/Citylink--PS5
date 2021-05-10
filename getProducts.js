const jsdom = require("jsdom")
const axios = require('axios');
var getNewConection = require('./getNewConection.js')
const { JSDOM } = jsdom
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
async function addLog(Smess, Smonitor, StableType) {
    let post = { mess: Smess, monitor: Smonitor, tabletype: StableType};
    let res = await axios.post('https://e-mobi.com.ru/monitors/api_addlog.php', post);
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
        addLog(`Запрос на список товара`, 1, 'logs');
        let ProductsList = dom.window.document.querySelectorAll('section.GroupGrid .product_data__pageevents-js')
        console.log('Обнаружил - '+ProductsList.length+' товара');
        ProductsList.forEach(function (item, i, arr) {
            let productName = item.querySelector('a.ProductCardVertical__name').textContent
            if (productName != '') {
                keywords.forEach(function (keyword, p, arrkeys) {
                    if (productName.indexOf(keyword) >= 0) {
                        console.log('Нужный товар найден!!');
                        let productLink = item.querySelector('a.ProductCardVertical__name').href
                        addLog(`Обнаружен товар ${productName}, ссылка ${productLink}`, 1, 'search');
                        console.log(productName);
                        console.log(productLink);
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