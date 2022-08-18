export default interface BaseResponse<T = any> {
  status: boolean;
  statusCode: number;
  messageKey: string;
  message: string;
  data: T;
}
