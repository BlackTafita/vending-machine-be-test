import {
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRole } from '../../shared/enums/user-role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
