import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
  }

  acceptsJson = headers => {
    return headers.accept
      ? headers.accept.split(',').indexOf('application/json') !== -1
      : false;
  };
}
