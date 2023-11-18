import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class MultiplesBy5Validator implements ValidatorConstraintInterface {
  validate(val: number) {
    return val % 5 === 0;
  }

  defaultMessage(): string {
    return 'Cost ($value) should be multiples of 5';
  }
}
