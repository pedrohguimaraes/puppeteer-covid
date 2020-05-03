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
    
    // console.log(encodeURIComponent(message))
    await send(encodeURIComponent(message))
    
}

async function getNews() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://google.com')
   
  // preenche o campo de busca do google
  await page.type('input[name="q"]', 'corona virus')

  // promise de aguardo de carregamento da página
  const waitForLoad = new Promise(resolve => page.on('load', () => resolve()))

  // clica no botão de pesquisa do google
  await page.evaluate(() => {
      document.querySelector('input[value="Pesquisa Google"]').click()
  })

  // promise de carregamento
  await waitForLoad

  // carrega as últimas notícias num array
  const links = await page.evaluate(() => {
    const news = []

     Array.from(document.querySelectorAll('.So9e7d a').values()).map((el) => {
        news.push({title: el.text , link: el.href})
     })

     return news
  })

  return links

//   await new Promise(resolve => setTimeout(resolve, 5000));
//   await browser.close();
}

async function send(message) {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
  
    await page.goto('https://web.whatsapp.com/send?text='+message)

    const waitForLoad = new Promise(resolve => page.on('load', () => resolve()))

    // aguarda o elemento ser carregado
    await page.waitForSelector('span[title="Felipe Santos"]')
    await page.waitForSelector('span[title="Danilo"]')
    

    await page.evaluate(() => {
         document.querySelector('span[title="Felipe Santos"]').click()
         document.querySelector('span[title="Danilo"]').click()
    })
    
    await page.waitForSelector('._3hV1n')

    await page.evaluate(() => {
        // send button
        document.querySelector('._3hV1n').click()
    })
   
    // await page.evaluate(() => {

    //     const eventFire = (el, etype) => {
    //         var evt = document.createEvent("MouseEvents");
    //         evt.initMouseEvent(etype, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null)
    //         el.dispatchEvent(evt)
    //     }

    //     eventFire(document.querySelector('span[title="Nelma"'), 'mousedown')
    // })

    // await page.waitForSelector('._1Plpp')

    // await page.type('._1Plpp', message)
  
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
}
  


  



