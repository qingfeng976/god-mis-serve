import express from 'express'
import axios from 'axios'
import prisma from '../prisma/client.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/ask', auth, async (req, res) => {
  const { question } = req.body

  try {
    const aiRes = await axios.post(
      'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
      {
        messages: [{ role: 'user', content: question }],
        model: 'ERNIE-Bot'
      },
      {
        params: {
          access_token: process.env.YIYAN_ACCESS_TOKEN
        }
      }
    )

    const answer = aiRes.data.result

    await prisma.chatRecord.create({
      data: {
        userId: req.userId,
        question,
        answer
      }
    })

    res.json({ answer })
  } catch (err) {
    console.error(err.response?.data || err.message)
    res.status(500).json({ error: 'AI 服务出错' })
  }
})

export default router
