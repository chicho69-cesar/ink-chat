import jwt from 'jsonwebtoken'

export class JWT {
  static generateJWT(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload = { userId }
      const secret = process.env.JWT_KEY || ''

      jwt.sign(
        payload,
        secret,
        {
          expiresIn: '31d'
        },
        (error, token) => {
          if (error) {
            console.error('Error generating JWT:', error)
            reject(error)
          } else {
            resolve(token!)
          }
        }
      )
    })
  }

  static verifyJWT(token: string): [boolean, string | null] {
    try {
      const secret = process.env.JWT_KEY || ''
      const { userId } = jwt.verify(token, secret) as { userId: string }
      return [true, userId]
    } catch (error) {
      console.error('Error verifying JWT:', error)
      return [false, null]
    }
  }
}