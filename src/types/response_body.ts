export interface ResponseBody<T = any> {
  ok: boolean;
  status: number;
  statusText: string;
  data: T;
  error?: boolean;
  errorMessage?: string;
}
