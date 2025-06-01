export interface IDataResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}