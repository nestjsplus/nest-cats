import * as Joi from '@hapi/joi';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { dbg } from '../helpers/debug-helper';
import * as util from 'util';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: object) {}

  transform(value: any, metadata: ArgumentMetadata) {
    dbg(this, 'input value: ', util.inspect(value));
    dbg(this, 'metadata: ', util.inspect(metadata));

    const { error } = Joi.validate(value, this.schema, { abortEarly: false });

    if (error) {
      dbg(this, 'error: ', util.inspect(error.details));
      throw new BadRequestException('Validation failed');
    }

    return value;
  }
}
