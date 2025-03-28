import { AggregateRoot } from '../../Shared/domain/AggregateRoot'
import { UserEmail } from './UserEmail'
import { UserId } from './UserId'
import { UserName } from './UserName'
import { UserPassword } from './UserPassword'

export class User extends AggregateRoot {
  readonly id: UserId
  readonly name: UserName
  readonly email: UserEmail
  readonly password: UserPassword

  constructor({ id, name, email, password }: { id: UserId; name: UserName; email: UserEmail; password: UserPassword }) {
    super()
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  static fromPrimitives(plainData: { id: string; name: string; email: string; password: string }): User {
    return new User({
      id: new UserId(plainData.id),
      name: new UserName(plainData.name),
      email: new UserEmail(plainData.email),
      password: new UserPassword(plainData.password)
    })
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    }
  }
}
