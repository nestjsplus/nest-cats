import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { dbg } from '../helpers/debug-helper';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    dbg(this, 'Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => dbg(this, `After... ${Date.now() - now}ms`)));
  }
}
