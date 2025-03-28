import { UserCreatorRequest } from '../../../../src/Context/User/application/dto/UserCreatorRequest'
import { User } from '../../../../src/Context/User/domain/User'
import { UserEmail } from '../../../../src/Context/User/domain/UserEmail'
import { UserId } from '../../../../src/Context/User/domain/UserId'
import { UserName } from '../../../../src/Context/User/domain/UserName'
import { UserPassword } from '../../../../src/Context/User/domain/UserPassword'
import { UserEmailMother } from './UserEmailMother'
import { UserIdMother } from './UserIdMother'
import { UserNameMother } from './UserNameMother'
import { UserPasswordMother } from './UserPasswordMother'

export class UserMother {
  static create(id: UserId, name: UserName, email: UserEmail, password: UserPassword): User {
    return new User({ id, name, email, password })
  }

  static fromRequest(request: UserCreatorRequest): User {
    return this.create(
      UserIdMother.create(request.id),
      UserNameMother.create(request.name),
      UserEmailMother.create(request.email),
      UserPasswordMother.create(request.password)
    )
  }

  static random(): User {
    return this.create(
      UserIdMother.random(),
      UserNameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random()
    )
  }
}
