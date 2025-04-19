import { Response } from 'express';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { Catch, Logger, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

@Catch(RpcException)
export class GrpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GrpcExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    // El contexto debe ser hacia el protocolo en el que se comunica el cliente -> gateway
    const context = host.switchToHttp();
    const response: Response = context.getResponse();

    console.log('Se captura en el filtro gRPC');

    const rpcError = exception.getError();
    let code = status.UNKNOWN;
    let message = 'Unknown gRPC error';

    try {
      if (typeof rpcError === 'object') {
        code = rpcError['code'] ?? status.UNKNOWN;
        message = rpcError['message'] ?? 'Unknown error message';
      } else {
        message = rpcError;
      }
    } catch (error) {
      this.logger.error('Error extracting gRPC exception details', error);
    }

    this.logger.error(`gRPC Exception caught: ${JSON.stringify(rpcError)}`);

    const httpStatus = this.mapGrpcCodeToHttp(code);

    return response.status(httpStatus).json({
      status: httpStatus,
      message,
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
