import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'

import { JWT } from '../helpers/jwt'
import { User, UserInstance } from '../models/user.model'

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body
      const existsUser = await User.findOne({ where: { email } })

      if (existsUser) {
        return res.status(400).json({
          ok: false,
          message: 'User already exists'
        })
      }

      const salt = bcrypt.genSaltSync()
      const passwordStrength = bcrypt.hashSync(password, salt)

      const user = User.build({
        email,
        password: passwordStrength,
        name
      }) as UserInstance

      await user.save()

      const token = await JWT.generateJWT(user.uid)

      return res.status(201).json({
        ok: true,
        user,
        token
      })
    } catch (error) {
      console.error('Error in register:', error)
      
      return res.status(500).json({
        ok: false,
        message: 'Internal server error'
      })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } }) as UserInstance

      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: 'Invalid credentials'
        })
      }

      const validPassword = bcrypt.compareSync(password, user.password)

      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: 'Invalid credentials'
        })
      }

      const token = await JWT.generateJWT(user.uid)

      return res.status(200).json({
        ok: true,
        user,
        token
      })
    } catch (error) {
      console.error('Error in login:', error)

      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  async renew(req: Request, res: Response) {
    try {
      const uid = req.uid
      const user = await User.findByPk(uid) as UserInstance

      if (!user) {
        return res.status(401).json({
          ok: false,
          msg: 'Unauthorized'
        })
      }

      const token = await JWT.generateJWT(user.uid)

      return res.status(200).json({
        ok: true,
        user,
        token
      })
    } catch (error) {
      console.error('Error in renew:', error)

      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }
}