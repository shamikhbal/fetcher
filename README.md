# Fetcher

Fetcher is a promise-based HTTP client for Node.js, built on top of the native Fetch API but with simplified syntax. It includes support for configurable HTTP methods, content types, timeouts, and an optional logging mechanism.

## Features

- Promise-based HTTP client
- Supports GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS methods
- Built-in timeout support
- Configurable Content-Types (JSON, form data, URL-encoded, plain text)
- Easy-to-use instance creation with base URL and default headers
- Optional logging for request and response data
- Built-in File Picker to easily handle file uploads
- TypeScript support with static typing for `body` and `ResponseBody<T>`

---

## Installation

```bash
npm install github:shamikhbal/fetcher#v1.1.6
```

## Importing Fetcher

---

You can import fetcher in various ways:

### ES Module

```javascript
import Fetcher from "fetcher";
```

or

```javascript
import { Fetcher, FilePicker, contentTypes, methods, ResponseBody } from "fetcher";
```

### CommonJS

```javascript
const Fetcher = require("fetcher");
```

## Usage

---

### Creating an Instance

To simplify repeated API calls to the same base URL, you can create a client instance using the `Fetcher` class. This function allows you to set a `baseURL` and default headers.

```javascript
const fetcher = new Fetcher({
  baseURL: "https://api.example.com", // Base URL for all requests
  defaultHeaders: {
    Authorization: "Bearer YOUR_TOKEN",
  },
  logging: true, // Optional, enables logging if set to true
});
```

### Making an API Call

With an instance created, you can now make REST API calls. Here is an example of a GET request with query parameters:

```javascript
const response = await fetcher.get({
  url: "/data",
  params: { id: 123 },
});
```

### TypeScript Example with Static Types

```javascript
type Timezone = {
  timezone: string;
};

type TimeResponse = {
  time: string;
  timezone: string;
};

const result: ResponseBody<TimeResponse> = await fetcher.post({
  url: "/api/fetcher/time",
  contentType: contentTypes.json,
  body: {
    timezone: "Malaysia/Perak",
  } as Timezone,
});

```

### File Upload

Fetcher supports file upload through the `formData` content type. Here are examples for uploading a single file and multiple files.

#### Single File Upload

```javascript
const file = await FilePicker.getSync(filePath);

const upload_record = await fetcher.post({
  url: "/upload",
  contentType: contentTypes.formData,
  body: {
    file: file,
  },
});
```

#### Multiple File Upload

```javascript
const file1 = await FilePicker.getSync(filePath1);
const file2 = await FilePicker.getSync(filePath2);
const file3 = await FilePicker.getSync(filePath3);

const upload_record = await fetcher.post({
  url: "/upload",
  contentType: contentTypes.formData,
  body: {
    files: [file1, file2, file3],
  },
});
```

## FilePicker

Fetcher includes a built-in FilePicker utility that allows you to easily read files from the file system.

### Methods

#### `FilePicker.getSync(filePath: string): File`

Reads a file from the file system synchronously and returns a `File` object.

- `filePath`: The path to the file to read.

Returns a `File` object containing the file's contents, name, and MIME type.

#### `FilePicker.get(filePath: string): Promise<File>`

Reads a file from the file system asynchronously and returns a `Promise` that resolves to a `File` object.

- `filePath`: The path to the file to read.

Returns a `Promise` that resolves to a `File` object containing the file's contents, name, and MIME type.

## API Reference

---

### Fetcher Class

The `Fetcher` class is the main interface for making HTTP requests.

#### Constructor

```javascript
new Fetcher(options);
```

- Parameters:
  - `options`: Configuration options for the HTTP client
    - `baseURL`: The base URL for all API requests
    - `defaultHeaders`: Default headers to apply to every request
    - `logging`: Enables request/response logging if set to true

### Methods

#### `fetcher(options)`

The main method for making an HTTP request.

- Parameters:
  - `options`: Configuration options for the HTTP request
    - `method`: HTTP method (e.g., `methods.get`, `methods.post`, `methods.put`, `methods.delete`, `methods.patch`, `methods.head`, `methods.options`)
    - `url`: Endpoint path appended to the base URL if provided
    - `contentType`: Specifies the content type (default is `contentTypes.json`)
    - `headers`: Custom headers for the request
    - `params`: Query parameters for the request
    - `body`: Request body, formatted based on the `contentType`
    - `timeout`: Timeout duration in milliseconds (default is 5000)
    - `logging`: Enable/disable logging for this request
  - Returns: A Promise that resolves

## Supported HTTP Methods

---

1. GET - `methods.get`
2. POST - `methods.post`
3. PUT - `methods.put`
4. DELETE - `methods.delete`
5. PATCH - `methods.patch`
6. HEAD - `methods.head`
7. OPTIONS - `methods.options`

## Supported Content-Types

---

1. JSON - contentTypes.json
2. Form Data - contentTypes.formData
3. URL-encoded - contentTypes.formUrlEncoded
4. Plain Text - contentTypes.textPlain

## Logging

---

Fetcher provides an optional logging mechanism using the pino library. You can enable logging by setting the logging option to true when creating an instance.

## License

---

Fetcher is licensed under the MIT License.
