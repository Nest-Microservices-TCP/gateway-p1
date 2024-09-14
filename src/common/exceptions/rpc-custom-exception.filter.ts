import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

/**
 * El objetivo principal de este filtro es capturar las excepciones que se
 * producen en los microservicios(que usan RPC para la comunicación), y
 * convertirlas en respuestas HTTP que puedan se entendidas por el cliente
 *
 * Centraliza el manejo de errores en un solo lugar, lo que permite
 * estandarizar cómo se gestionan y se reportan las excepciones al cliente
 */
export class RpcCustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcCustomExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    this.logger.error({ exception });

    const rpcError = exception.getError();

    // this.logger.error(`RPC Error: ${rpcError.toString()}`, exception.stack);

    /**
     * Maneja el caso cuando el erro viene con mensaje vació
     */
    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: rpcError
          .toString()
          .substring(0, rpcError.toString().indexOf('(') - 1),
        timestamp: new Date().toISOString(),
        path: ctx.getRequest().url,
      });
    }

    /**
     * Maneja el caso cuando el error tiene la estructura que definimos
     * en los microservicios, por ende solo lo parsea a una respuesta HTTP
     */
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      return response.status(status).json(rpcError);
    }

    /**
     * Maneja todos los demás errores que no coincidan con los casos
     * anteriores
     */
    response.status(400).json({
      status: 400,
      message: rpcError,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
