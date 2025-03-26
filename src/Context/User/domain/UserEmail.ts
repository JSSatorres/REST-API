import { StringValueObject } from 'Context/Shared/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValidEmail(value)
  }

  private ensureIsValidEmail(email: string): void {
    if (!this.isValidEmail(email)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${email}>`)
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
