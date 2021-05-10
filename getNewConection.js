const puppeteer = require('puppeteer')
const proxyChain = require('proxy-chain')
const citySelect = require('./citySelect.js')
function getProxy() {
    let arr = [
        'http://P8B1byap:5iRWcGrQ@92.249.15.237:54443',
        'http://P8B1byap:5iRWcGrQ@45.129.79.36:63811',
        'http://P8B1byap:5iRWcGrQ@2.56.138.228:61735',
        'http://P8B1byap:5iRWcGrQ@45.131.47.233:45945',
        'http://P8B1byap:5iRWcGrQ@45.148.242.159:48602',
        'http://P8B1byap:5iRWcGrQ@45.132.129.146:51231',
        'http://P8B1byap:5iRWcGrQ@45.139.52.29:50887',
        'http://P8B1byap:5iRWcGrQ@91.188.231.136:60840',
        'http://P8B1byap:5iRWcGrQ@194.156.104.189:59736',
        'http://P8B1byap:5iRWcGrQ@91.199.112.55:48734',
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
    await page.goto(gotolink, {waitUntil: 'networkidle0'})
    await citySelect(page, city)
    connection.browser = browser
    connection.page = page
    return connection
}
module.exports = getNewConection;