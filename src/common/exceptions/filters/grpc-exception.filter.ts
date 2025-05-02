import { Response } from 'express';
import { RpcException } from '@nestjs/microservices';
import { Catch, Logger, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { CustomExceptionDetails } from 'src/grpc/common/common_exceptions.pb';
import { CustomException } from '../interfaces';
import { mapGrpcCodeToHttp } from 'src/common/utils';

@Catch(RpcException)
export class GrpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GrpcExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    // El contexto debe ser hacia el protocolo en el que se comunica el cliente -> gateway
    const rpcError = exception.getError();

    let customException: CustomException<string>;

    let details: CustomExceptionDetails;
    let grpcCode: number;
    let className: string;
    let methodName: string;

    if (typeof rpcError === 'object') {
      customException = rpcError as CustomException<string>;

      details = JSON.parse(customException.details);
      grpcCode = details?.metadata?.grpc_code ?? 2;
      className = details?.metadata?.class_name ?? 'Unknown service';
      methodName = details?.metadata?.method_name ?? 'Unknown method';
    }

    this.logger.error(
      `[${className}.${methodName}] RpcException: ${details.exception_message}`,
    );

    const context = host.switchToHttp();
    const response: Response = context.getResponse();

    const httpStatus = mapGrpcCodeToHttp(grpcCode);

    return response.status(httpStatus).json({
      status: httpStatus,
      message: details?.exception_message,
      metadata: details?.metadata,
      timestamp: new Date().toISOString(),
      path: context.getRequest().url,
    });
  }
}
