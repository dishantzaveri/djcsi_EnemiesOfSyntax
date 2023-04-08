import pupetter from 'puppeteer';
import { ConnectionPolicyTargetListInstance } from 'twilio/lib/rest/voice/v1/connectionPolicy/connectionPolicyTarget';

const ASAIN_CHECKBOX = '.form-global__custom-element.form-radio-input__custom-element.align-middle';
const ASIAN_INPUT = '.planning-to-do input.form-global__field.form-text-input__field';
const ASAIN_PAINTS_URL = 'https://www.asianpaints.com/resources/tools/paint-budget-calculator.html';

const params = {
  TYPE_FRESH: 0,
  TYPE_REPAINT: 1,
  SELECT_INTERIOR: 2,
  SELECT_EXTERIOR: 3,
  SIZE_1: 4,
  SIZE_2: 5,
  SIZE_3: 6
};

const questions = {
  1: { '#i5': 0.525, '#i8': 0.475 },
  2: { '#i15': 0.902, '#i18': 0.098 },
  3: { '#i25': 0.869, '#i18': 0.131 },

  5: { '#i39': 0.836, '#i42': 0.164 },
  6: { '#i49': 0.23, '#i52': 0.77 },

  7: { '#i59': 0.197, '#i62': 0.344, '#i65': 0.213, '#i68': 0.246 },

  8: { '#i75': 0.656, '#i78': 0.328, '#i81': 0.016 },
  9: { '#i88': 0.623, '#i91': 0.377 }
};

async function asianPaintsCalculator(typeOfProject, paintSpacing, homeSize, carpetArea) {
  const browser = await pupetter.launch({ headless: false });
  //   const browser = await pupetter.launch();
  const page = await browser.newPage();

  await page.goto(ASAIN_PAINTS_URL);

  const paintOptions = await page.$$(ASAIN_CHECKBOX);

  await paintOptions[typeOfProject].click();
  await paintOptions[paintSpacing].click();
  await paintOptions[homeSize].click();

  // Question without an #id
  const q4options = { 0: '0', 1: '0.049', 2: '0.23', 3: '0.393', 4: '0.328' };

  const selectedq4option = weightedRand(q4options);
  await q4[selectedq4option()].click();

  // Click the submit button
  await page.click('.uArJ5e.UQuaGc.Y5sE8d.VkkpIf.QvWxOd');
  await page.waitForNavigation();
  await browser.close();
}

(async function loop() {
  // Change the number of times to run
  const noOfSubmissions = 25;
  for (let i = 0; i < noOfSubmissions; i++) {
    await main();
    console.log(`${i + 1} form submitted`);
  }
})();
