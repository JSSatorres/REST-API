import { Router, Request, Response } from 'express'
import container from '../dependency-injection/container.js'

export const register = (router: Router) => {
  const controller = container.resolve('statusGetController')
  router.get('/status', (req: Request, res: Response) => controller.run(req, res))
}
