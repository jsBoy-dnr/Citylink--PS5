const puppeteer = require('puppeteer')
const proxyChain = require('proxy-chain')
const citySelect = require('./citySelect.js')
function getProxy() {
    let arr = [
        'http:',
    ]
    return arr[Math.floor(Math.random()*arr.length)]
}
async function getNewConection(gotolink, city) {
    console.log('Создаю новое соединение с новым прокси');
    let connection = {
        browser: '',
        page: ''
    }
    const newProxyUrl = await proxyChain.anonymizeProxy(getProxy())
    let browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: true,
        slowMo: 300,
        devtools: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox', `--proxy-server=${newProxyUrl}`]
    })
    let page = await browser.newPage()
    await page.setViewport({
        width: 1400, height: 800
    })
    await page.setDefaultNavigationTimeout(0);
    await Promise.all([
        await page.goto(gotolink, {waitUntil: 'networkidle0'}),
        page.waitForSelector('.MainHeader__city'),
    ]);

    await citySelect(page, city)
    connection.browser = browser
    connection.page = page
    return connection
}
module.exports = getNewConection;
