import { UserEmail } from 'Context/User/domain/UserEmail'
import { UserName } from 'Context/User/domain/UserName'
import { UserPassword } from 'Context/User/domain/UserPassword'
import { Uuid } from 'Context/Shared/domain/value-object/Uuid'
import { AggregateRoot } from 'Context/Shared/domain/AggregateRoot'

export class User extends AggregateRoot {
  readonly id: Uuid
  readonly name: UserName
  readonly email: UserEmail
  readonly password: UserPassword

  constructor({ id, name, email, password }: { id: Uuid; name: UserName; email: UserEmail; password: UserPassword }) {
    super()
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  static fromPrimitives(plainData: { id: string; name: string; email: string; password: string }): User {
    return new User({
      id: new Uuid(plainData.id),
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
