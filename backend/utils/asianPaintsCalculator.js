import puppeteer from 'puppeteer';

const ASIAN_CHECKBOX = '.form-global__custom-element.form-radio-input__custom-element.align-middle';
const ASIAN_INPUT = '.planning-to-do input.form-global__field.form-text-input__field';
const ASIAN_PAINTS_URL = 'https://www.asianpaints.com/resources/tools/paint-budget-calculator.html';
const ASIAN_SUBMIT = '.ctaText.text-uppercase.js-calculate-now-ladingpage-btn';
const ASIAN_P_TITLE = '.estimation-details.planning-to-do.mb-0 .mb-4';
const ASIAN_P_DESC = '.mb-0.prod-description';
const ASIAN_P_QC = '.budget-estimation.d-flex.justify-content-between .mt-2';
const ASIAN_P_IMG = '.recommended-product-img';
const ASIAN_P_LINK = '.d-inline-block.mb-3';

const params = {
  TYPE_FRESH: 0,
  TYPE_REPAINT: 1,
  SELECT_INTERIOR: 2,
  SELECT_EXTERIOR: 3,
  SIZE_1: 4,
  SIZE_2: 5,
  SIZE_3: 6
};

export default async function asianPaintsCalculator(typeOfProject, paintSpacing, homeSize, carpetArea) {
  const browser = await puppeteer.launch({ headless: true });
  //   const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(ASIAN_PAINTS_URL, { waitUntil: 'networkidle2' });

  await page.waitForSelector(ASIAN_CHECKBOX);

  const paintOptions = await page.$$(ASIAN_CHECKBOX);

  await paintOptions[typeOfProject].click();
  await paintOptions[paintSpacing].click();
  await paintOptions[homeSize].click();

  await page.waitForSelector(ASIAN_INPUT);

  await page.$eval(ASIAN_INPUT, (el, value) => (el.value = value), carpetArea);

  await page.waitForSelector(ASIAN_SUBMIT);
  // Click the submit button
  const submit = await page.$(ASIAN_SUBMIT);
  await submit.click();
  await page.evaluate((el) => el.click(), submit);

  await page.waitForSelector(ASIAN_P_TITLE);
  await page.waitForSelector(ASIAN_P_DESC);
  await page.waitForSelector(ASIAN_P_QC);
  await page.waitForSelector(ASIAN_P_IMG);
  await page.waitForSelector(ASIAN_P_LINK);

  const paintTitle = await page.$$(ASIAN_P_TITLE);
  const paintDesc = await page.$$(ASIAN_P_DESC);
  const paintQC = await page.$$(ASIAN_P_QC);
  const paintQuantity = [];
  const paintCost = [];
  const tempPaintQC = [paintQuantity, paintCost];
  paintQC.forEach((v, i) => tempPaintQC[i % 2].push(v));

  const paintImg = await page.$$(ASIAN_P_IMG);
  const paintLink = await page.$$(ASIAN_P_LINK);

  const paintInfo = [];

  for (let i = 0; i < paintTitle.length; i++) {
    paintInfo.push({
      title: await page.evaluate((el) => el.textContent, paintTitle[i]),
      desc: await page.evaluate((el) => el.textContent, paintDesc[i]),
      quantity: await page.evaluate((el) => el.textContent, paintQuantity[i]),
      cost: await page.evaluate((el) => el.textContent, paintCost[i]),
      img: await page.evaluate((el) => el.src, paintImg[i]),
      link: await page.evaluate((el) => el.href, paintLink[i])
    });
  }

  await browser.close();
  return paintInfo;
}
