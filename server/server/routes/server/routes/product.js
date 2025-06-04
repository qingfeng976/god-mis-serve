import express from 'express'
import prisma from '../prisma/client.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// 获取所有商品（当前用户）
router.get('/', auth, async (req, res) => {
  const products = await prisma.product.findMany({
    where: { userId: req.userId }
  })
  res.json(products)
})

// 添加商品
router.post('/', auth, async (req, res) => {
  const { name, sku, price, stock, categoryId } = req.body
  const product = await prisma.product.create({
    data: {
      name, sku, price, stock,
      categoryId,
      userId: req.userId
    }
  })
  res.json(product)
})

// 删除商品
router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id
  await prisma.product.delete({ where: { id } })
  res.json({ msg: '已删除' })
})

export default router
