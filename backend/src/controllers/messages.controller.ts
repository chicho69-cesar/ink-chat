import type { Request, Response } from 'express'
import { Op } from 'sequelize'

import { Message } from '../models/message.model'

export class MessagesController {
  async getChat(req: Request, res: Response) {
    try {
      const uid = req.uid
      const messageFrom = req.params.from

      const lastThirtyMessages = await Message.findAll({
        where: {
          [Op.or]: [
            { from: uid, to: messageFrom },
            { from: messageFrom, to: uid }
          ]
        },
        order: [['created_at', 'ASC']],
        limit: 30
      })

      return res.status(200).json({
        ok: true,
        messages: lastThirtyMessages
      })
    } catch (error) {
      console.error('Error in getChat:', error)

      return res.status(500).json({
        ok: false,
        message: 'Internal server error'
      })
    }
  }
}