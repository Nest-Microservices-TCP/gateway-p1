import { Response } from 'express';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { Catch, Logger, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { CustomException, CustomExceptionDetails } from './interfaces';

@Catch(RpcException)
export class GrpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GrpcExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    // El contexto debe ser hacia el protocolo en el que se comunica el cliente -> gateway
    const rpcError = exception.getError();

    let _exception: CustomException<string>;
    let details: CustomExceptionDetails;

    if (typeof rpcError === 'object') {
      _exception = rpcError as CustomException<string>;
      details = JSON.parse(_exception.details);
    }

    this.logger.error(`RpcException: ${details.details}`);

    const context = host.switchToHttp();
    const response: Response = context.getResponse();

    const httpStatus = this.mapGrpcCodeToHttp(_exception.code);

    return response.status(httpStatus).json({
      status: httpStatus,
      message: details.details,
      metadata: details.metadata,
      timestamp: new Date().toISOString(),
      path: context.getRequest().url,
    });
  }

  private mapGrpcCodeToHttp(code: number): number {
    switch (code) {
      case status.INVALID_ARGUMENT:
        return 400;
      case status.NOT_FOUND:
        return 404;
      case status.ALREADY_EXISTS:
        return 409;
      case status.PERMISSION_DENIED:
      case status.UNAUTHENTICATED:
        return 403;
      case status.UNAVAILABLE:
        return 503;
      case status.DEADLINE_EXCEEDED:
        return 504;
      case status.UNIMPLEMENTED:
        return 501;
      case status.FAILED_PRECONDITION:
        return 412;
      default:
        return 500;
    }
  }
}
