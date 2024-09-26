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

    const allStatements = await page.evaluate( () => {
        const statements = document.querySelectorAll('div.notice')

        return Array.from(statements).map((statement) => {
            const date = statement.querySelector('h4').innerText
            const text = statement.querySelector('p').innerText

            return {date, text}
        })
    })
    console.log(allStatements)
    await browser.close()
}

main();