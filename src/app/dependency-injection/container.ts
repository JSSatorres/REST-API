import { createContainer, asClass } from 'awilix'
import StatusGetController from '../controllers/StatusGetController'
import { UserPutController } from '../controllers/UserPutController'

const container = createContainer({
  strict: true
})

container.register({
  statusGetController: asClass(StatusGetController).singleton(),
  userPutController: asClass(UserPutController).singleton()
})

export default container
