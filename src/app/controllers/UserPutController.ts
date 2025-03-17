import { Request, Response } from 'express'
import { Controller } from './Controller.js'

export class UserPutController implements Controller {
  run(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented.')
    // const user = await this.userPutService.run(req.body, req.params.id)
    // res.status(200).json(user)
  }
}
