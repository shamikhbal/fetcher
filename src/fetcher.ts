import bodyParser from "./helper/body_parser";
import headersParser from "./helper/header_parser";
import logger from "./helper/logger";
import encodeParams from "./helper/param_encoder";
import responseBuilder from "./helper/response_builder";
import { contentTypes } from "./types/content_types";
import { methods } from "./types/methods";
import { RequestOptions } from "./types/request_options";
import { ResponseBody } from "./types/response_body";

const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timer);
    return response;
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
};

class Fetcher {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private logging: boolean;

  constructor({
    baseURL = "",
    defaultHeaders = {},
    logging = false,
  }: {
    baseURL?: string;
    defaultHeaders?: Record<string, string>;
    logging?: boolean;
  } = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
    this.logging = logging;
  }

  async request({
    method = methods.get,
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    body,
    timeout = 10000,
  }: RequestOptions): Promise<ResponseBody> {
    const fullUrl = this.baseURL + url;
    const combinedHeaders = { ...this.defaultHeaders, ...headers };

    let requestOptions: RequestInit = {
      method,
      headers: headersParser({ jsonHeaders: combinedHeaders, contentType }),
      redirect: "follow",
    };

    if (params) {
      const encodedParams = encodeParams(params);
      url = `${fullUrl}?${encodedParams}`;
    }

    if (body) {
      requestOptions.body = bodyParser({
        contentType,
        jsonBody: body,
      });
    }

    const start = Date.now();

    try {
      const response = await fetchWithTimeout(url, requestOptions, timeout);

      if (this.logging) {
        logger(start, method, url, response, requestOptions);
      }

      if (response.ok) {
        return await responseBuilder(response);
      } else {
        throw await responseBuilder(response);
      }
    } catch (error) {
      throw error;
    }
  }

  async get({
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    timeout = 10000,
  }: RequestOptions): Promise<ResponseBody> {
    return this.request({
      method: methods.get,
      url,
      contentType,
      headers,
      params,
      timeout,
    });
  }

  async post({
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    body,
    timeout = 10000,
  }: RequestOptions): Promise<ResponseBody> {
    return this.request({
      method: methods.post,
      url,
      contentType,
      headers,
      params,
      body,
      timeout,
    });
  }

  async put({
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    body,
    timeout = 10000,
  }: RequestOptions): Promise<ResponseBody> {
    return this.request({
      method: methods.put,
      url,
      contentType,
      headers,
      params,
      body,
      timeout,
    });
  }

  async delete({
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    body,
    timeout = 10000,
  }: RequestOptions): Promise<ResponseBody> {
    return this.request({
      method: methods.delete,
      url,
      contentType,
      headers,
      params,
      body,
      timeout,
    });
  }

  async patch({
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    body,
    timeout = 10000,
  }: RequestOptions): Promise<ResponseBody> {
    return this.request({
      method: methods.patch,
      url,
      contentType,
      headers,
      params,
      body,
      timeout,
    });
  }

  async head({
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    timeout = 10000,
  }: RequestOptions): Promise<ResponseBody> {
    return this.request({
      method: methods.head,
      url,
      contentType,
      headers,
      params,
      timeout,
    });
  }

  async options({
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    timeout = 10000,
  }: RequestOptions): Promise<ResponseBody> {
    return this.request({
      method: methods.options,
      url,
      contentType,
      headers,
      params,
      timeout,
    });
  }
}

export default Fetcher;
