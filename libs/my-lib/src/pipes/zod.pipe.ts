import {
  PipeTransform,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import type * as z from 'zod';

export class ZodValidationPipe<T, R> implements PipeTransform<T, R> {
  constructor(private schema: z.Schema<R, any, T>) {}

  transform<T>(value: T, _metadata: ArgumentMetadata): R {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new UnprocessableEntityException('Validation failed');
    }
  }
}
