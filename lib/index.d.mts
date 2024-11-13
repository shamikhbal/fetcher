declare const contentTypes: {
    readonly json: "application/json";
    readonly formData: "multipart/form-data";
    readonly formUrlEncoded: "application/x-www-form-urlencoded";
    readonly textPlain: "text/plain";
};
type ContentType = (typeof contentTypes)[keyof typeof contentTypes];

declare const methods: {
    readonly get: "GET";
    readonly post: "POST";
    readonly put: "PUT";
    readonly delete: "DELETE";
};
type Method = (typeof methods)[keyof typeof methods];

interface RequestOptions {
    method?: Method;
    url: string;
    contentType?: ContentType;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    body?: any;
    timeout?: number;
    logging?: boolean;
}

interface ResponseBody {
    ok: boolean;
    status: number;
    statusText: string;
    data: any;
    error?: boolean;
    errorMessage?: string;
}

declare const fetcher: ({ method, url, contentType, headers, params, body, timeout, logging, }: RequestOptions) => Promise<ResponseBody>;
declare const create_instance: ({ baseURL, defaultHeaders, logging, }: {
    baseURL?: string;
    defaultHeaders?: Record<string, string>;
    logging?: boolean;
}) => ({ method, url, contentType, headers, params, body, timeout, }: RequestOptions) => Promise<ResponseBody>;

export { contentTypes, create_instance, fetcher, methods };
