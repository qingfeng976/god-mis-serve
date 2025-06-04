import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/product.js'
import inventoryRoutes from './routes/inventory.js'
import aiChatRoutes from './routes/ai-chat.js'
import feedbackRoutes from './routes/feedback.js'
import setupRoutes from './routes/setup.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/chat', aiChatRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/setup', setupRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`))
