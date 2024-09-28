const puppeteer = require("puppeteer")
require("dotenv").config()
const allStatements = async (res) => {
    try {
        const browser = await puppeteer.launch(
            {
                executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
                headless: true, //nie otwieraj okna
                args: [
                    '--no-sandbox', 
                    '--disable-setuid-sandbox',
                    '--single-process',
                    '--no-zygote',
                ],
            }
        );
        const page = await browser.newPage();
        await page.goto("https://zse.edu.pl/Siewniak/",  {
            waitUntil: "networkidle2"
        });


        const statements = await page.evaluate(() => {
            const statementElements = document.querySelectorAll('div.notice');
            return Array.from(statementElements).map((statement) => {
                const date = statement.querySelector('h4')?.innerText || "Brak daty";
                const text = statement.querySelector('p')?.innerText || "Brak treści";
                return { date, text };
            });
        }) 

        res.send(statements);
    }catch (e) {
        console.log(e);
        res.send("Wystąpił błąd po stronie przeglądarki");
    } finally {
        await browser.close()
    }
}

module.exports = {allStatements}