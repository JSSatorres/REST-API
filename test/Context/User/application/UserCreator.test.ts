import { UserCreator } from '../../../../src/Context/User/application/UserCreator'

import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock'
import { UserCreatorRequestMother } from './UserCreatorRequestMother'
import { UserMother } from '../domain/UserMother'

let repository: UserRepositoryMock
let creator: UserCreator

beforeEach(() => {
  repository = new UserRepositoryMock()
  creator = new UserCreator(repository)
})

describe('UserCreator', () => {
  it('should create a valid user', async () => {
    const request = UserCreatorRequestMother.random()

    const course = UserMother.fromRequest(request)
    await creator.run(request)

    repository.assertSaveHaveBeenCalledWith(course)
  })

  // it('should throw error if user name length is short', async () => {
  //   const repository = new UserRepositoryMock()
  //   const creator = new UserCreator(repository)
  //   const id = '0766c602-d4d4-48b6-9d50-d3253123275e'
  //   const name = 'Jo'
  //   const email = 'mail@mail.es'
  //   const password = 'password123'

  //   expect(() => {
  //     const user = new User({
  //       id: new UserId(id),
  //       name: new UserName(name),
  //       email: new UserEmail(email),
  //       password: new UserPassword(password)
  //     })
  //     creator.run({ id, name, email, password })
  //   })
  //   // repository.assertSaveHaveBeenCalledWith(expectedUser)
  // })

  //   const expectedUser = new User(id, name, email, password)
  //   await creator.run({ id, name, email, password })

  // })
})
