import { StringValueObject } from 'Context/Shared/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValidPassword(value)
  }

  private ensureIsValidPassword(password: string): void {
    if (!this.isValidPassword(password)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${password}>`)
    }
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 6
  }
}
