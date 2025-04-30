export interface CustomExceptionDetails {
  details: string;
  cause: string;
  metadata: { service: string };
}
