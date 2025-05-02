import { status as GrpcStatus } from '@grpc/grpc-js';

export function mapGrpcCodeToHttp(code: number): number {
  switch (code) {
    case GrpcStatus.INVALID_ARGUMENT:
      return 400;
    case GrpcStatus.NOT_FOUND:
      return 404;
    case GrpcStatus.ALREADY_EXISTS:
      return 409;
    case GrpcStatus.PERMISSION_DENIED:
    case GrpcStatus.UNAUTHENTICATED:
      return 403;
    case GrpcStatus.UNAVAILABLE:
      return 503;
    case GrpcStatus.DEADLINE_EXCEEDED:
      return 504;
    case GrpcStatus.UNIMPLEMENTED:
      return 501;
    case GrpcStatus.FAILED_PRECONDITION:
      return 412;
    default:
      return 500;
  }
}
