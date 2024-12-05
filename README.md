# Fetcher

=====================================

Fetcher is a promise-based HTTP client for Node.js, built on top of the native Fetch API but with simplified syntax. It includes support for configurable HTTP methods, content types, timeouts, and an optional logging mechanism.

## Features

---

- Promise-based HTTP client
- Supports GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS methods
- Built-in timeout support
- Configurable Content-Types (JSON, form data, URL-encoded, plain text)
- Easy-to-use instance creation with base URL and default headers
- Optional logging for request and response data

## Installation

---

```bash
npm install github:shamikhbal/fetcher#v1.1.2
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
import { Fetcher, contentTypes, methods } from "fetcher";
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

### File Upload

Fetcher supports file upload through the `formData` content type. Here are examples for uploading a single file and multiple files.

#### Single File Upload

```javascript
const fileBuffer = fs.readFileSync(path);
const fileBlob = new Blob([fileBuffer], { type: "text/xml" });

const upload_record = await fetcher.post({
  url: "/upload",
  contentType: contentTypes.formData,
  body: {
    file: fileBlob,
  },
});
```

#### Multiple File Upload

```javascript
const fileBuffer1 = fs.readFileSync(path1);
const fileBlob1 = new Blob([fileBuffer1], { type: "text/xml" });

const fileBuffer2 = fs.readFileSync(path2);
const fileBlob2 = new Blob([fileBuffer2], { type: "text/xml" });

const fileBuffer3 = fs.readFileSync(path3);
const fileBlob3 = new Blob([fileBuffer3], { type: "text/xml" });

const upload_record = await fetcher.post({
  url: "/upload",
  contentType: contentTypes.formData,
  body: {
    files: [fileBlob1, fileBlob2, fileBlob3],
  },
});
```

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
  - Returns: A Promise that resolves to the response data or rejects with an error

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
