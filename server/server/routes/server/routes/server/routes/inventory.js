import express from 'express'
import prisma from '../prisma/client.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// 入库
router.post('/in', auth, async (req, res) => {
  const { productId, quantity } = req.body
  const product = await prisma.product.update({
    where: { id: productId },
    data: { stock: { increment: quantity } }
  })

  await prisma.inventoryRecord.create({
    data: {
      productId,
      type: 'IN',
      quantity,
      userId: req.userId
    }
  })

  res.json(product)
})

// 出库
router.post('/out', auth, async (req, res) => {
  const { productId, quantity } = req.body
  const product = await prisma.product.update({
    where: { id: productId },
    data: { stock: { decrement: quantity } }
  })

  await prisma.inventoryRecord.create({
    data: {
      productId,
      type: 'OUT',
      quantity,
      userId: req.userId
    }
  })

  res.json(product)
})

// 查看出入库记录
router.get('/records', auth, async (req, res) => {
  const records = await prisma.inventoryRecord.findMany({
    where: { userId: req.userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' }
  })
  res.json(records)
})

export default router
