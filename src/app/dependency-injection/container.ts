import { createContainer, asClass } from 'awilix'
import StatusGetController from '../controllers/StatusGetController.js'

const container = createContainer({
  strict: true
})

container.register({
  statusGetController: asClass(StatusGetController).singleton()
})

export default container
