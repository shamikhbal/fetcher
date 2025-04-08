import { ContentType } from "./content_types";
import { Method } from "./methods";

export interface RequestOptions<T = any> {
  method?: Method;
  url: string;
  contentType?: ContentType;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: T;
  timeout?: number;
  logging?: boolean;
}
