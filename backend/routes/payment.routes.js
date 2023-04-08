import express from 'express';
import Razorpay from 'razorpay';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.controller.js';
import { verifyToken } from '../middleware/auth.js';
import Donation from '../models/Donation.js';

import emailUtil from '../utils/email.js';
import sendSms from '../utils/sendSms.js';

const router = express.Router();

/* CREATE */

/* READ */

router.post('/donate', async (req, res) => {
  try {
    var instance = new Razorpay({ key_id: 'rzp_test_71ifT7shoxSTLN', key_secret: 'K2BAAsYlo94TAL0Os1DYXBzB' });

    console.log(req.body);
    // const { amount } = req.body;

    // const donation = await Donation.create({ amount, userId: '63eec3b630a0f640351497ea' });

    const op = await instance.orders.create({
      amount: 240000,
      currency: 'INR',
      receipt: `Thank you for your donation of Rs.2400`
    });

    const emailUtil1 = await emailUtil.sendEmail({
      email: 'kjmickey003@gmail.com',
      subject: 'Thank you for your donation of Rs.2400',
      html: '<h1>We are grateful for your donation of Rs.2400.</h1> <p>Your donation will help us to continue our work in providing support for army of our country. </p><p>We will send you a receipt for your donation.</p> Thank you for your support.'
    });

    const smsUtil = await sendSms({
      to: '+9619247188',
      body: 'Your donation of Rs.2400 has been received. Thank you for your support. We will send you a receipt for your donation. Thank you for your support.'
    });

    res.status(201).json({ op });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// router.get("/:userId/posts", getUserBlogs);

/* UPDATE */
// router.patch("/:id/like", likePost);

export default router;
