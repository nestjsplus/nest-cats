import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { dbg } from '../helpers/debug-helper';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    dbg(this, 'Before...');

    return next.handle().pipe(
      map(data => (data ? { data } : undefined)),
      tap(() => dbg(this, `After...`)),
    );
  }
}
