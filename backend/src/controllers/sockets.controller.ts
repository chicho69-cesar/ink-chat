import { Message } from '../models/message.model'
import { User, UserInstance } from '../models/user.model'

export class SocketsController {
  async userConnected(ui: string) {
    const user = await User.findByPk(ui) as UserInstance

    if (user) {
      user.online = true
      await user.save()
    }

    return user
  }

  async userDisconnected(ui: string) {
    const user = await User.findByPk(ui) as UserInstance

    if (user) {
      user.online = false
      await user.save()
    }

    return user
  }

  async getUsers() {
    const users = await User.findAll({
      where: { online: true },
      attributes: ['uid', 'name', 'email', 'online'],
      order: [['online', 'DESC']]
    })

    return users
  }

  async saveMessage(payload: { from: string, to: string, message: string }) {
    try {
      const { from, to, message } = payload
      const newMessage = await Message.create({
        from,
        to,
        message
      })

      return newMessage
    } catch (error) {
      console.error('Error saving message:', error)
      return null
    }
  }
}