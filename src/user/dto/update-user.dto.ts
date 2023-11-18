import {
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
