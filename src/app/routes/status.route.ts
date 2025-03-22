import { Router, Request, Response } from 'express'
import container from '../dependency-injection/container'
import StatusGetController from '../controllers/StatusGetController'

export const register = (router: Router) => {
  const controller: StatusGetController = container.resolve('statusGetController')
  router.get('/status', (req: Request, res: Response) => controller.run(req, res))
}
