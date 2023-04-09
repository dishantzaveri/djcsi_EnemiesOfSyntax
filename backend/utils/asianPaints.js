import puppeteer from 'puppeteer';
import Paint from '../models/Paint.js';

const ASIAN_PAINT_URL_GREY = 'https://www.asianpaints.com/catalogue/colour-catalogue/grey-wall-colours.html';
const ASIAN_PAINT_URL_BLUE = 'https://www.asianpaints.com/catalogue/colour-catalogue/blue-wall-colours.html';
const ASIAN_PAINT_URL_BROWN = 'https://www.asianpaints.com/catalogue/colour-catalogue/brown-wall-colours.html';
const ASIAN_PAINT_URL_RO = 'https://www.asianpaints.com/catalogue/colour-catalogue/red-wall-colours.html';
const ASIAN_PAINT_URL_YG = 'https://www.asianpaints.com/catalogue/colour-catalogue/green-wall-colours.html';
const ASIAN_PAINT_URL_PP = 'https://www.asianpaints.com/catalogue/colour-catalogue/purple-wall-colours.html';
const ASIAN_PAINT_URL_WO = 'https://www.asianpaints.com/catalogue/colour-catalogue/white-wall-colours.html';

const ASIAN_PAINT = [
  ASIAN_PAINT_URL_GREY,
  ASIAN_PAINT_URL_BLUE,
  ASIAN_PAINT_URL_BROWN,
  ASIAN_PAINT_URL_RO,
  ASIAN_PAINT_URL_YG,
  ASIAN_PAINT_URL_PP,
  ASIAN_PAINT_URL_WO
];

const ASIAN_PAINT_COLORS = '.cc-swatch-list.js-colorCatRevampCardList';
const ASIAN_LOAD_MORE = '.ctaText.js-shadeRevamp-colorLoadMoreBtn';

export default async function getAsianPaints() {
  const browser = await puppeteer.launch();
  //   const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(ASIAN_PAINT_URL_WO, { waitUntil: 'networkidle2' });

  await page.waitForSelector(ASIAN_PAINT_COLORS);

  let isDataAvailable = false;

  while (!isDataAvailable) {
    await page.waitForSelector(ASIAN_LOAD_MORE);
    const loadMore = await page.$(ASIAN_LOAD_MORE);
    await loadMore.click();

    isDataAvailable = await loadMore.evaluate((el) => {
      if (el.style.display === 'none') {
        return true;
      }
      return false;
    });
  }

  // await page.waitForSelector(ASIAN_PAINT_COLORS);

  const paintInfo = [];

  const paintColorsGrid = await page.$$(ASIAN_PAINT_COLORS);

  const paintColor = await page.$$('.cc-swatch--colorcode');

  const paintTitle = await page.$$('.cc-swatch--desc--colorName.text-capitalize');

  const paintSku = [];

  const paintLinks = [];

  for (let x in paintColorsGrid) {
    const paintSkuOne = await paintColorsGrid[x].$('.cc-swatch--desc--skucode');
    paintSku.push(paintSkuOne);

    const paintLinkOne = await paintColorsGrid[x].evaluate((el) => el.getAttribute('data-pageurl'));
    paintLinks.push(paintLinkOne);
  }

  for (let i in paintColor) {
    const paintColorOne = await paintColor[i].evaluate((el) => el.style.backgroundColor);
    const paintTitleOne = await paintTitle[i].evaluate((el) => el.innerText);
    const paintSkuOne = await paintSku[i].evaluate((el) => el.innerText);

    paintInfo.push({
      source: 'ASIAN',
      paintUrl: paintLinks[i],
      sourceSku: paintSkuOne,
      paintTitle: paintTitleOne,
      paintColor: paintColorOne,
      paintColorCategory: 'WHITE & OFF WHITE'
    });
  }

  await browser.close();

  console.log('------Scraped Data-------');

  console.log('------Saving Data-------');
  for (let i in paintInfo) {
    const paint = new Paint(paintInfo[i]);

    await paint.save();
  }
  console.log('------Data Saved-------');

  await browser.close();

  return paintInfo;
}
