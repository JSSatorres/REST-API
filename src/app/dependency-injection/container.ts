import { createContainer, asClass, asFunction } from 'awilix'
import StatusGetController from '../controllers/StatusGetController'
import { UserPutController } from '../controllers/UserPutController'
import { UserCreator } from 'Context/User/application/UserCreator'

const container = createContainer({
  strict: true
})

container.register({
  statusGetController: asClass(StatusGetController).singleton(),
  userPutController: asClass(UserPutController).singleton(),
  userCreator: asClass(UserCreator).singleton()
})

export default container
