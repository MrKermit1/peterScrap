const puppeteer = require("puppeteer");

const allFiles = async (res) => {

    try{
        const browser = await puppeteer.launch(
            {
                headless: true, //nie otwieraj okna
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
        );
        const page = await browser.newPage();
        await page.goto("https://zse.edu.pl/Siewniak/",  {
            waitUntil: "networkidle2"
        });


        const files = await page.evaluate(() => {
            const fileElements = document.querySelectorAll('div.file');
            return Array.from(fileElements).map((file) => {
                const name = file.querySelector('h4').innerText.replace(/\s+/, "") || "brak nazwy"; //usuwa białe spacje
                const hrefs = Array.from( file.querySelectorAll('a') ).map((link) => {
                    return ({
                        href: link.getAttribute('href'),
                    })
                }) || "brak linku"
                return {name, hrefs}
            })
        }) 

        res.send(files);
    } catch (e) {
        console.log(e)
        res.send("Wystąpił błąd po stronie serwera.")
    } finally {
        await browser.close();
    }
}

module.exports = {allFiles}