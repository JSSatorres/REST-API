import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValidEmail(value)
  }

  private ensureIsValidEmail(value: string): void {
    if (!this.isValidEmail(value)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`)
    }
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }
}
