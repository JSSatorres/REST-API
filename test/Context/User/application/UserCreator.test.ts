import { UserRepository } from '../../../../src/Context/User/domain/UserRepository'
import { UserCreator } from '../../../../src/Context/User/application/UserCreator'
import { User } from '../../../../src/Context/User/domain/User'
describe('UserCreator', () => {
  it('should create a valid user', async () => {
    const repository: UserRepository = {
      save: jest.fn()
    }
    const creator = new UserCreator(repository)
    const id = '12345'
    const name = 'John Doe'
    const email = 'mail@mail.es'
    const password = 'password123'

    const expectedUser = new User(id, name, email, password)
    await creator.run(id, name, email, password)

    expect(repository.save).toHaveBeenCalledWith(expectedUser)
  })
})
