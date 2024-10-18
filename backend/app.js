import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config.js'
import patientRoute from './routes/patientRoutes.js'
import authRequestRoutes from './routes/authRequestRoutes.js';

const app = express()
dotenv.config()

app.use(cors({
  origin: 'https://basys-ai-omega.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json())

connectDB()

app.use('/api/patients', patientRoute)
app.use('/api/auth-requests', authRequestRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})