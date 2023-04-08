// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'ACf65908c2f7a9b4d73faa0d058d2da09b';
const authToken = process.env.TWILIO_AUTH_TOKEN;
import client from 'twilio';

const makeCall = async (text, number) => {
  console.log(process.env.TWILIO_PHONE_NUMBER);

  client(accountSid, authToken)
    .calls.create({
      twiml: `<Response><Say>${text}</Say></Response>`,
      to: number,
      from: '+18509003878'
    })
    .then((call) => {
      console.log(call.sid);
      return call;
    });
};

export default makeCall;
