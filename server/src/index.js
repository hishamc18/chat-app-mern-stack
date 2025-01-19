import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './lib/socket.js';
import path from 'path'

dotenv.config()


// const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(cors(corsOptions))


app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

if(true){
    app.use(express.static(path.join(__dirname, '../client/dist')))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
      });
}

server.listen(PORT, ()=>{
    console.log('Server is listening on' + PORT);
    connectDB()
})