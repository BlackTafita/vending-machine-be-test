import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { MultiplesBy5Validator } from '../../shared/validators/multiples-by-5.validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  amountAvailable: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Validate(MultiplesBy5Validator)
  cost: number;
}
