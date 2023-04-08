// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = 'ACf65908c2f7a9b4d73faa0d058d2da09b';
const authToken = process.env.TWILIO_AUTH_TOKEN;
import client from 'twilio';

// const client = require('twilio')(accountSid, authToken);

const sendSms = async (options) => {
  console.log(process.env.TWILIO_PHONE_NUMBER);
  const msg = {
    to: options.to,
    from: '+18509003878',
    body: options.body
  };
  client(accountSid, authToken)
    .messages.create(msg)
    .then((message) => {
      console.log(message.sid);
      return message;
    });
};

export default sendSms;
