import { Router } from 'express'

import { MessagesController } from '../controllers/messages.controller'
import { ValidateJWT } from '../middlewares/validate-jwt'

export class MessagesRoutes {
  private router: Router
  private messagesController: MessagesController

  constructor() {
    this.router = Router()
    this.messagesController = new MessagesController()

    this.initRoutes()
  }

  private initRoutes() {
    this.router.get(
      '/:from',
      [ValidateJWT.validateJWT as any],
      this.messagesController.getChat as any
    )
  }

  get Router() {
    return this.router
  }
}
