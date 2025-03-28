import { UserEmail } from '../../../../src/Context/User/domain/UserEmail'
import { EmailMother } from '../../Shared/domain/emailMother'

export class UserEmailMother {
  static create(value: string): UserEmail {
    return new UserEmail(value)
  }
  static random(): UserEmail {
    return new UserEmail(EmailMother.random())
  }

  static invalidEmail(): string {
    return 'invalid-email'
  }
  static invalidEmailWithSpecialCharacters(): string {
    return 'invalid-email@'
  }
  static invalidEmailWithSpaces(): string {
    return 'invalid email'
  }
}
