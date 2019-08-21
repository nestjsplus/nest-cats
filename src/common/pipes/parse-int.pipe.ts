import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import * as util from 'util';
import { dbg } from '../helpers/debug-helper';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata): number {
    dbg(this, `input value: ${value}`);
    dbg(this, 'metadata: ' + util.inspect(metadata));

    const val = parseInt(value, 10);
    if (isNaN(val)) {
      dbg(this, 'validation failed: not a number');
      throw new BadRequestException('Validation failed');
    }

    dbg(this, 'return value: ' + util.inspect(val));
    return val;
  }
}
