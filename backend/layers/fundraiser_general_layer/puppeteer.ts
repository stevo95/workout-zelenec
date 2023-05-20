import chromium from '/opt/lambdas_example_npm_packages/nodejs/node_modules/chrome-aws-lambda';
import puppeteer from '/opt/lambdas_example_npm_packages/nodejs/node_modules/puppeteer-core';

export const getBalance = async (url: string) => {
    try {
        console.log(chromium.args);
        console.log(await chromium.executablePath);
        const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
          });

        console.log('browser init finished');
        const page = await browser.newPage();
    
        console.log('browser new page');
        await page.setJavaScriptEnabled(true);
        
        console.log('js enabled');
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
        console.log('ua set');
        
        await page.goto(url);
        console.log('went to page');
        
        await page.waitForSelector('.ScreenForm.ScreenFormCommon.ScreenForm-main.ScreenForm-show.padding-no-vertical.padding-no-horizontal.print-no-title.viewport-root.size-md');
        console.log('wait 1');
        await page.waitForSelector('.ScreenForm.ScreenFormCommon.ScreenForm-main.ScreenForm-show.padding-no-vertical.padding-no-horizontal.print-no-title.viewport-root.size-md > div.Widget-Form-outer.no-print.padding-no-vertical.padding-no-horizontal.print-no-title > div.Widget-Form.padding-no-vertical.padding-no-horizontal.print-no-title > div > div > div > div.portlet-col.Container.Container-left.Container-notitle.bottom.visible.Container-optional.WidgetPanel.WidgetContainer.Title-left.head-line.pnl-white.portlet-col-xs-12');
        console.log('wait 2');
        await page.waitForSelector('#app > div > div.App-container > div:nth-child(3) > div.Page.ScreenFormPage.home > div > div.ScreenForm.ScreenFormCommon.ScreenForm-main.ScreenForm-show.padding-no-vertical.padding-no-horizontal.print-no-title.viewport-root.size-md > div.Widget-Form-outer.no-print.padding-no-vertical.padding-no-horizontal.print-no-title > div.Widget-Form.padding-no-vertical.padding-no-horizontal.print-no-title > div > div > div > div.portlet-col.Container.Container-left.Container-notitle.bottom.visible.Container-optional.WidgetPanel.WidgetContainer.Title-left.head-line.pnl-white.portlet-col-xs-12 > div > div > div.portlet-col.Container.Container-left.Container-notitle.top.visible.Container-optional.WidgetPanel.WidgetContainer.Title-left.portlet-col-lg-12.portlet-col-md-4.portlet-col-sm-6.portlet-col-xs-12 > div > div > div > div > div.Container-content > div > span');
        console.log('wait 3');
        
        const amountElement = await page.$('#app > div > div.App-container > div:nth-child(3) > div.Page.ScreenFormPage.home > div > div.ScreenForm.ScreenFormCommon.ScreenForm-main.ScreenForm-show.padding-no-vertical.padding-no-horizontal.print-no-title.viewport-root.size-md > div.Widget-Form-outer.no-print.padding-no-vertical.padding-no-horizontal.print-no-title > div.Widget-Form.padding-no-vertical.padding-no-horizontal.print-no-title > div > div > div > div.portlet-col.Container.Container-left.Container-notitle.bottom.visible.Container-optional.WidgetPanel.WidgetContainer.Title-left.head-line.pnl-white.portlet-col-xs-12 > div > div > div.portlet-col.Container.Container-left.Container-notitle.top.visible.Container-optional.WidgetPanel.WidgetContainer.Title-left.portlet-col-lg-12.portlet-col-md-4.portlet-col-sm-6.portlet-col-xs-12 > div > div > div > div > div.Container-content > div');
        console.log('done');
    
        if (!amountElement) {
            throw new Error('Failed to fetch Bank data.');
        }
    
        const amountValue = await amountElement.$eval('span', (element) => element.textContent);
        await browser.close();
    
        return amountValue;
    } catch (e) {
        console.log(e);
        throw e;
    }
}