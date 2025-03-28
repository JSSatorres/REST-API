import { UserPassword } from '../../../../src/Context/User/domain/UserPassword'
import { MotherCreator } from '../../Shared/domain/MotherCreator'

export class UserPasswordMother {
  static create(value: string): UserPassword {
    return new UserPassword(value)
  }

  static random(): UserPassword {
    return this.create(MotherCreator.random().internet.password())
  }

  static invalidPassword(): string {
    return 'a'.repeat(40)
  }
}
