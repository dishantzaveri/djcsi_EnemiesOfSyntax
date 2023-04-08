import express from 'express';
import { login } from '../controllers/auth.controller.js';
import emailUtil from '../utils/sendEmail.js';
import makeCall from '../utils/makeCall.js';
import sendSms from '../utils/sendSms.js';

const router = express.Router();

router.post('/login', login);

router.post('/email', async (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const html = req.body.html;
  const attachments = req.body.attachments;

  const emailUtil1 = await emailUtil.sendEmail({
    email,
    subject,
    html,
    attachments: []
  });
  console.log(email);
  console.log(subject);
  console.log(html);
  console.log(attachments);
  res.send({ msg: 'Email sent successfully' });
});

router.post('/sms', async (req, res) => {
  const to = req.body.to;
  const body = req.body.body;

  const smsUtil = await sendSms({
    to: to,
    body: body
  });
  console.log(to);
  console.log(body);
  res.send({ msg: 'SMS sent successfully' });
});

router.post('/call', async (req, res) => {
  const to = req.body.to;
  const to1 = req.body.to1;
  const body =
    "I'm in danger and I need your help urgently and in currently in DJ Sanghvi and I'm facing a dangerous situation.";

  const callUtil = await makeCall(body, to);
  const callUtil1 = await makeCall(body, to1);
  console.log(to);
  console.log(body);
  res.send({ msg: 'Call sent successfully' });
});

export default router;
