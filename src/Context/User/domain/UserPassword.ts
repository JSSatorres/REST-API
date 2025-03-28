import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValidPassword(value)
  }

  private ensureIsValidPassword(value: string): void {
    if (!this.isValidPassword(value)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`)
    }
  }

  private isValidPassword(value: string): boolean {
    return value.length >= 6
  }
}
