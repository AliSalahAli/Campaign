import { HttpStatus, ValidationPipeOptions } from '@nestjs/common';

export const validationOptions: ValidationPipeOptions = {
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  transform: true,
};
