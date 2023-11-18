import { createParamDecorator } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const ReqUser = createParamDecorator(
  (data: any, context: ExecutionContextHost) => {
    const [req] = context.getArgs();
    return req.user as { id: number; role: UserRole } | undefined;
  },
);
