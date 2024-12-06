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
    readonly patch: "PATCH";
    readonly head: "HEAD";
    readonly options: "OPTIONS";
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

declare class Fetcher {
    private baseURL;
    private defaultHeaders;
    private logging;
    constructor({ baseURL, defaultHeaders, logging, }?: {
        baseURL?: string;
        defaultHeaders?: Record<string, string>;
        logging?: boolean;
    });
    request({ method, url, contentType, headers, params, body, timeout, }: RequestOptions): Promise<ResponseBody>;
    get({ url, contentType, headers, params, timeout, }: RequestOptions): Promise<ResponseBody>;
    post({ url, contentType, headers, params, body, timeout, }: RequestOptions): Promise<ResponseBody>;
    put({ url, contentType, headers, params, body, timeout, }: RequestOptions): Promise<ResponseBody>;
    delete({ url, contentType, headers, params, body, timeout, }: RequestOptions): Promise<ResponseBody>;
    patch({ url, contentType, headers, params, body, timeout, }: RequestOptions): Promise<ResponseBody>;
    head({ url, contentType, headers, params, timeout, }: RequestOptions): Promise<ResponseBody>;
    options({ url, contentType, headers, params, timeout, }: RequestOptions): Promise<ResponseBody>;
}

declare class FilePicker {
    static getSync(filePath: string): File;
    static get(filePath: string): Promise<File>;
}

declare const fetcher: {
    Fetcher: typeof Fetcher;
    contentTypes: {
        readonly json: "application/json";
        readonly formData: "multipart/form-data";
        readonly formUrlEncoded: "application/x-www-form-urlencoded";
        readonly textPlain: "text/plain";
    };
    methods: {
        readonly get: "GET";
        readonly post: "POST";
        readonly put: "PUT";
        readonly delete: "DELETE";
        readonly patch: "PATCH";
        readonly head: "HEAD";
        readonly options: "OPTIONS";
    };
};

export { Fetcher, FilePicker, contentTypes, fetcher as default, methods };
