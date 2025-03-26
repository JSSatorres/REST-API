import { Request, Response } from 'express'
import { Controller } from './Controller'
import { UserCreator } from 'Context/User/application/UserCreator'

export class UserPutController implements Controller {
  constructor(private userCreator: UserCreator) {}
  async run(req: Request, res: Response): Promise<void> {
    const { id, name, email, password } = req.body

    await this.userCreator.run({ id, name, email, password })

    res.status(httpStatus.CREATED).send()
  }
}
