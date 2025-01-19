import express from 'express'
import { protect } from '../middlewares/auth.middleware.js'
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.get('/users', protect, getUsersForSidebar)
router.get('/:id', protect, getMessages) // here the id = id of user to chat
router.post('/send/:id', protect, sendMessage) // here the id = id of the receiver

export default router;