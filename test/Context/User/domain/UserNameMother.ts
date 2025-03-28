import { UserName } from '../../../../src/Context/User/domain/UserName'
import { WordMother } from '../../Shared/domain/WordMother'

export class UserNameMother {
  static create(value: string): UserName {
    return new UserName(value)
  }

  static random(): UserName {
    return this.create(WordMother.random({ maxLength: 10 }))
  }
  static invalidName(): string {
    return 'a'.repeat(40)
  }
}
