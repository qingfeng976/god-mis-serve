import express from 'express'
import prisma from '../prisma/client.js'
import { getAIReply } from '../utils/ai.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const { content } = req.body

  const answer = await getAIReply(content)

  await prisma.feedbackRecord.create({
    data: {
      userId: req.userId,
      content,
      answer,
      status: 'AUTO_REPLIED',
      type: 'QUESTION'
    }
  })

  res.json({ message: '反馈已提交，AI已处理', answer })
})

export default router
