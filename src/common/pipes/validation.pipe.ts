import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import * as util from 'util';
import { dbg } from '../helpers/debug-helper';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    dbg(this, 'input value: ' + util.inspect(value));
    dbg(this, 'metadata: ' + util.inspect(metadata));

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      dbg(this, 'error: ' + util.inspect(errors));
      throw new BadRequestException('Validation failed');
    }
    dbg(this, 'return value: ' + util.inspect(value));
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
