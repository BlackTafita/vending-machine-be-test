import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { MultiplesBy5Validator } from '../../shared/validators/multiples-by-5.validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  productName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  amountAvailable: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Validate(MultiplesBy5Validator)
  cost: number;
}
