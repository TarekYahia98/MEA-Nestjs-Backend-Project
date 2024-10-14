import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import { CustomError } from '../classes';
import { ErrorType } from '../enums';


export class JoiValidationPipe<T = any> implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema<T>) {}

  transform(value: T, metadata: ArgumentMetadata): T {
    const { error, value: validatedValue } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(
        new CustomError({
          localizedMessage: {
            en: 'Validation failed',
            ar: 'فشل التحقق من البيانات',
          },
          error: error.details[0],
          event: 'VALIDATION_FAILED',
          errorType: ErrorType.WRONG_INPUT,
        }),
      );
    }

    return validatedValue;
  }
}

