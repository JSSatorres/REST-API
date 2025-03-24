import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'

export class UserCreator {
  constructor(private userRepository: UserRepository) {}

  async run(id: string, name: string, email: string, password: string): Promise<void> {
    const user = new User(id, name, email, password)

    return this.userRepository.save(user)
  }
}
