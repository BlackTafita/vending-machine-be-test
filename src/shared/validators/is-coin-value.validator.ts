import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCoinValue } from '../utils/coin-value';

@ValidatorConstraint()
export class IsCoinValueValidator implements ValidatorConstraintInterface {
  validate(val: number) {
    return isCoinValue(val);
  }

  defaultMessage(): string {
    return 'Coin should be equal to 5 | 10 | 20 | 50 | 100';
  }
}
