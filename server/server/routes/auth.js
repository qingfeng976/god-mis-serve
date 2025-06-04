import express from 'express'
import prisma from '../prisma/client.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = express.Router()

// 注册
router.post('/register', async (req, res) => {
  const { phone, password } = req.body
  const existing = await prisma.user.findUnique({ where: { phone } })
  if (existing) return res.status(400).json({ error: '手机号已注册' })

  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { phone, password: hash }
  })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
  res.json({ token, user })
})

// 登录
router.post('/login', async (req, res) => {
  const { phone, password } = req.body
  const user = await prisma.user.findUnique({ where: { phone } })
  if (!user) return res.status(401).json({ error: '手机号或密码错误' })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(401).json({ error: '手机号或密码错误' })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
  res.json({ token, user })
})

export default router
