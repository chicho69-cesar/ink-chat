import { Router } from 'express'
import { check } from 'express-validator'

import { AuthController } from '../controllers/auth.controller'
import { ValidateFields } from '../middlewares/validate-fields'
import { ValidateJWT } from '../middlewares/validate-jwt'

export class AuthRoutes {
  private router: Router
  private authController: AuthController

  constructor() {
    this.router = Router()
    this.authController = new AuthController()

    this.initRoutes()
  }

  private initRoutes() {
    this.router.post(
      '/register',
      [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        ValidateFields.validateFields
      ],
      this.authController.register as any
    )

    this.router.post(
      '/login',
      [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        ValidateFields.validateFields
      ],
      this.authController.login as any
    )

    this.router.get(
      '/renew',
      [ValidateJWT.validateJWT as any],
      this.authController.renew as any
    )
  }

  get Router() {
    return this.router
  }
}