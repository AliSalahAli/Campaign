import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
    Logger,
  } from '@nestjs/common';
  import { FastifyReply } from 'fastify';
  
  @Catch()
  export class BaseExceptionFilter implements ExceptionFilter {
    catch(exception, host: ArgumentsHost) {
      const response = host.switchToHttp().getResponse<FastifyReply>();
      if (exception instanceof HttpException) {
        Logger.error(exception);
        return response
          .status(exception.getStatus())
          .send(exception.getResponse());
      } else if (exception instanceof Error) {
        Logger.error(`Unhandled ${exception.message}`);
        Logger.debug(exception.stack);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Unhandled error occured during the process',
        });
      }
    }
  }
  