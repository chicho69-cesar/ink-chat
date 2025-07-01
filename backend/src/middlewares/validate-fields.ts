import { validationResult } from 'express-validator'

export class ValidateFields {
  static validateFields(req: any, res: any, next: any) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.array()
      })
    }

    next()
  }
}