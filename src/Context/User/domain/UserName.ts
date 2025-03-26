import { StringValueObject } from 'Context/Shared/domain/value-object/StringValueObject'
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'

export class UserName extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValidName(value)
  }

  private ensureIsValidName(name: string): void {
    if (!this.isValidName(name)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${name}>`)
    }
  }

  private isValidName(name: string): boolean {
    return name.length > 4
  }
}
