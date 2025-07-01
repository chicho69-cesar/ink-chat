import cors from 'cors'
import express from 'express'
import http from 'node:http'
import path from 'node:path'
import { Server as SocketServer } from 'socket.io'

import { db } from './database/config'
import { AuthRoutes } from './routes/auth.routes'
import { MessagesRoutes } from './routes/messages.routes'
import { Sockets } from './sockets'

export class Server {
  private app: express.Application
  private port: number
  private server: http.Server
  private io: SocketServer

  private sockets: Sockets
  private authRoutes: AuthRoutes
  private messagesRoutes: MessagesRoutes

  constructor() {
    this.app = express()
    this.port = parseInt(process.env.PORT || '8080')

    this.dbConnection()

    this.server = http.createServer(this.app)

    this.io = new SocketServer(this.server, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      }
    })

    this.sockets = new Sockets(this.io)
    this.authRoutes = new AuthRoutes()
    this.messagesRoutes = new MessagesRoutes()
  }

  async dbConnection() {
    try {
      await db.authenticate()
      db.sync()

      console.log('Database connected successfully')
    } catch (error) {
      console.error('Database connection error:', error)
    }
  }

  middlewares() {
    this.app.use(express.static(path.join(process.cwd(), 'public')))
    this.app.use(express.json())

    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }))

    this.app.use('/api/auth', this.authRoutes.Router)
    this.app.use('/api/messages', this.messagesRoutes.Router)
  }

  execute() {
    this.middlewares()

    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`)
    })
  }
}
