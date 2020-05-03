const puppeteer = require('puppeteer')

const takeScreenshot = async() => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto('https://br.op.gg', {timeout: 0})

    // preenche campo de pesquisa
    await page.type('.summoner-search-form input', 'miuji')
    page.keyboard.press('Enter');
    // botão de search
   // const selectorButton = '.summoner-search-form__button'
    //await page.waitForSelector(selectorButton)
    // await page.click(selectorButton)
    // await page.waitForSelector('.RankType');
    await page.screenshot({path: 'rank.png'})
    // const selectorRank = '.RankType'
    // await page.waitForSelector(selectorRank)

    // const rank = await page.$$(selectorRank)
    // await page.screenshot({path: 'rank.png'})


    await browser.close()
}

takeScreenshot()