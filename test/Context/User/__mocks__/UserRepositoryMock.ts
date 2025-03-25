import { User } from '../../../../src/Context/User/domain/User'
import { UserRepository } from '../../../../src/Context/User/domain/UserRepository'

export class UserRepositoryMock implements UserRepository {
  saveMock: jest.Mock

  constructor() {
    this.saveMock = jest.fn()
  }

  async save(user: User): Promise<void> {
    this.saveMock(user)
  }
}
