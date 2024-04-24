const puppeteer = require('puppeteer')

run().then(() => console.log('Done'))

async function run(){
    const news = await getNews()
    var message = '*ÚLTIMAS NOTÍCIAS SOBRE O COVID-19 NO MUNDO*\n\n\n\n';

    news.map((value, index) => {

        if(index < 7){
            value.title = value.title.replace('\n', '')
            message += '*'+value.title+'*\n'+value.link+'\n\n'
        }
    })
    
    await send(encodeURIComponent(message))
    
}

async function getNews() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://google.com')
   
  await page.type('input[name="q"]', 'corona virus')

  const waitForLoad = new Promise(resolve => page.on('load', () => resolve()))

  await page.evaluate(() => {
      document.querySelector('input[value="Pesquisa Google"]').click()
  })

  await waitForLoad

  const links = await page.evaluate(() => {
    const news = []

     Array.from(document.querySelectorAll('.So9e7d a').values()).map((el) => {
        news.push({title: el.text , link: el.href})
     })

     return news
  })

  return links

async function send(message) {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
  
    await page.goto('https://web.whatsapp.com/send?text='+message)

    const waitForLoad = new Promise(resolve => page.on('load', () => resolve()))

    await page.waitForSelector('span[title="Felipe Santos"]')
    await page.waitForSelector('span[title="Danilo"]')
    

    await page.evaluate(() => {
         document.querySelector('span[title=""]').click()
         document.querySelector('span[title=""]').click()
    })
    
    await page.waitForSelector('._3hV1n')

    await page.evaluate(() => {
        // send button
        document.querySelector('._3hV1n').click()
    })
  
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
}
  


  



