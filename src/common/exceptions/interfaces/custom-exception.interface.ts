import { Metadata, status } from '@grpc/grpc-js';

export interface CustomException<T> {
  code: status;
  details: T;
  metadata: Metadata;
}
