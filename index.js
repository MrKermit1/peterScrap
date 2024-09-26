const puppeteer = require("puppeteer")

const url = "https://zse.edu.pl/Siewniak/"

const main = async () => {
    const browser = await puppeteer.launch(
        {
            headless: true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }
    )
    const page = await browser.newPage()
    await page.goto(url)

    //KOMUNIKATY
    const allStatements = await page.evaluate( () => {
        const statements = document.querySelectorAll('div.notice')

        return Array.from(statements).map((statement) => {
            const date = statement.querySelector('h4').innerText
            const text = statement.querySelector('p').innerText

            return {date, text}
        })
    })

    //PLIKI(MATERIAŁY)
    const allFiles = await page.evaluate( () => {
        const files = document.querySelectorAll('div.file')

        return Array.from(files).map((file) => {
            const name = file.querySelector('h4').innerText.replace(/\s+/, "") //usuwa białe spacje
            const hrefs = Array.from( file.querySelectorAll('a') ).map((link) => {
                return JSON.stringify({
                    href: link.getAttribute('href'),
                    title: link.innerText
                })
            })

            return {name, hrefs}
        })
    } )

    //console.log(allStatements)
    console.log(allFiles)
    await browser.close()
}

main();