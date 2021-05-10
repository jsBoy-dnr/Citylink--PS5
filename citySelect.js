async function citySelect(page, city) {
    console.log('Выбираю нужный город');
    await page.click('.MainHeader__city > button');
    await page.waitForTimeout(300)
    await page.click(`a[data-search="${city}"]`)
    await page.waitForTimeout(1000)


    console.log('End city select');
}
module.exports = citySelect;