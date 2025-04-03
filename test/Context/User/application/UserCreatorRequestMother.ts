import { UserCreatorRequest } from '../../../../src/Context/User/application/dto/UserCreatorRequest'
import { UserEmail } from '../../../../src/Context/User/domain/UserEmail'
import { UserId } from '../../../../src/Context/User/domain/UserId'
import { UserName } from '../../../../src/Context/User/domain/UserName'
import { UserPassword } from '../../../../src/Context/User/domain/UserPassword'
import { UserEmailMother } from '../domain/UserEmailMother'
import { UserIdMother } from '../domain/UserIdMother'
import { UserNameMother } from '../domain/UserNameMother'
import { UserPasswordMother } from '../domain/UserPasswordMother'

export class UserCreatorRequestMother {
  static create(id: UserId, name: UserName, email: UserEmail, password: UserPassword): UserCreatorRequest {
    return { id: id.value, name: name.toString(), email: email.toString(), password: password.toString() }
  }

  static random(): UserCreatorRequest {
    return this.create(
      UserIdMother.random(),
      UserNameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random()
    )
  }

  static invalidNameRequest(): UserCreatorRequest {
    return {
      id: UserIdMother.random().value,
      name: UserNameMother.invalidName(),
      email: UserEmailMother.random().toString(),
      password: UserPasswordMother.random().toString()
    }
  }
}
