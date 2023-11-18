import { createParamDecorator } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';

export const ReqUser = createParamDecorator((data: any, req) => {
  return req.user as { id: number; role: UserRole } | undefined;
});
