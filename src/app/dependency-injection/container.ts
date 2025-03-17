import { createContainer, asClass } from 'awilix'
import StatusGetController from '../controllers/StatusGetController.js'
import { UserPutController } from '../controllers/UserPutController.js'

const container = createContainer({
  strict: true
})

container.register({
  statusGetController: asClass(StatusGetController).singleton(),
  userPutController: asClass(UserPutController).singleton()
})

export default container
