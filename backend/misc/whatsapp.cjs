const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

const AMAZON_SOFA = [
  'https://www.amazon.in/Kuber-Industries-Circle-Design-Cotton/dp/B07XLLH8KR/ref=sr_1_5?keywords=sofa+white&sr=8-5',
  'https://www.amazon.in/Cozy-Couch-Bermont-Upholstered-Off-White/dp/B09CNS1W3B/ref=sr_1_6?keywords=sofa+white&sr=8-6',
  'https://www.amazon.in/Funterior-Seater-Stylish-Leatherette-White/dp/B075P1SZ7M/ref=sr_1_8?keywords=sofa+white&sr=8-8',
  'https://www.amazon.in/Sekar-Lifestyle-Box-Seater-Colour/dp/B0841QC5TR/ref=sr_1_9?keywords=sofa+white&qid=1680968620&sr=8-9',
  'https://www.amazon.in/Cloth-Fusion-Velvet-Pieces-Italian/dp/B07JR166Z9/ref=sr_1_10?keywords=sofa+white&qid=1680968620&sr=8-10',
  'https://www.amazon.in/Kuber-Industries-Circle-Design-CTKTC28678/dp/B0813F49RV/ref=sr_1_12?keywords=sofa+white&qid=1680968620&sr=8-12',
  'https://www.amazon.in/Cozy-Couch-Sectional-Interchangeable-Off-White/dp/B09CH83MVK/ref=sr_1_13?keywords=sofa+white&qid=1680968620&sr=8-13',
  'https://www.amazon.in/ND-EURO-HANDICRAFT-Chesterfield-Hallway/dp/B0BTC8BM5Y/ref=sr_1_14?keywords=sofa+white&qid=1680968620&sr=8-14',
  'https://www.amazon.in/Lifestyle-Solutions-Solid-Fabric-Off-White/dp/B07D19JZ9X/ref=sr_1_15?keywords=sofa+white&qid=1680968620&sr=8-15'
];

client.on('message', async (message) => {
  if (message.hasMedia) {
    message.reply(`Here are some of the recommendations to buy this sofa: \n${AMAZON_SOFA.join('\n')}`);
  }
});

client.initialize();
