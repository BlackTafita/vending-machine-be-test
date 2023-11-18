import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { CoinValue } from '../../shared/utils/coin-value';
import { IsCoinValueValidator } from '../../shared/validators/is-coin-value.validator';

export class DepositDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsCoinValueValidator)
  coin: CoinValue;
}
