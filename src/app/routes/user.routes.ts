import { Router } from 'express'
import container from '../dependency-injection/container.js'
import { UserPutController } from '../controllers/UserPutController.js'

export const register = (router: Router) => {
  const controlelr: UserPutController = container.resolve('userPutController')
  router.put('/user/:id', (req, res) => controlelr.run(req, res))
}
