import express from 'express';
import { getUser, getUserFriends, addRemoveFriend, getAllUsers } from '../controllers/users.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllUsers);
/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
