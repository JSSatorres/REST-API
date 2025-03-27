import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserCreatorRequest } from './dto/UserCreatorRequest'
import { UserId } from '../domain/UserId'
import { UserName } from '../domain/UserName'
import { UserEmail } from '../domain/UserEmail'
import { UserPassword } from '../domain/UserPassword'

export class UserCreator {
  constructor(private readonly userRepository: UserRepository) {}

  async run(request: UserCreatorRequest): Promise<void> {
    const { id, name, email, password } = request
    const user = new User({
      id: new UserId(id),
      name: new UserName(name),
      email: new UserEmail(email),
      password: new UserPassword(password)
    })

    return this.userRepository.save(user)
  }
}
