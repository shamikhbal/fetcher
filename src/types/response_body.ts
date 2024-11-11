export interface ResponseBody {
  ok: boolean;
  status: number;
  statusText: string;
  data: any;
  error?: boolean;
  errorMessage?: string;
}
