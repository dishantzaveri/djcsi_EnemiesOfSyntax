import express from 'express';
import { createHost, deleteHost, getHosts, updateHost } from '../controllers/host.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
// router.get('/', verifyToken, getFeedPosts);
router.get('/', getHosts);
router.post('/', createHost);
router.put('/:id', updateHost);
router.delete('/:id', deleteHost);
// router.get('/:userId/posts', verifyToken, getUserPosts);
// router.get('/location/:location', getPostsOnLocation);

// /* UPDATE */
// router.patch('/:id/like', verifyToken, likePost);

export default router;
