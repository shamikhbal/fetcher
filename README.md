# Fetcher

Fetcher is a promise-based HTTP client for Node.js, built on top of the native Fetch API but with simplified syntax. It includes support for configurable HTTP methods, content types, timeouts, and an optional logging mechanism.

## Features

- Promise-based HTTP client.
- Supports GET, POST, PUT, DELETE methods.
- Built-in timeout support.
- Configurable Content-Types (JSON, form data, URL-encoded, plain text).
- Easy-to-use instance creation with base URL and default headers.
- Optional logging for request and response data.

## Installation

```bash
npm install github:shamikhbal/fetcher
```

## Importing Fetcher

You can import fetcher in various ways:

### ES Module

```javascript
import fetcher_client from "fetcher";
```

or

```javascript
import { contentTypes, methods, create_instance } from "fetcher";
```

### CommonJS

```javascript
const fetcher = require("fetcher");
```

## Usage

### Creating an Instance

To simplify repeated API calls to the same base URL, you can create a client instance using create_instance. This function allows you to set a baseURL and default headers.

```javascript
const fetcher = create_instance({
  baseURL: "http://openlibrary.org", // Base URL for all requests
  defaultHeaders: {
    "User-Agent": "fetcher-client",
  },
  logging: true, // Optional, enables logging if set to true
});
```

### Making an API Call

With an instance created, you can now make REST API calls. Here is an example of a GET request with query parameters:

```javascript
const result = await fetcher({
  method: methods.get,
  url: "/search/lists.json",
  contentType: contentTypes.json,
  params: {
    q: "book",
    limit: 20,
    offset: 0,
  },
});
```

## API Reference

create_instance(options)
Creates a reusable fetcher client instance with specific configurations.

- Parameters:
  - options {Object}: Configuration options for the instance.
    - baseURL {string} (Optional): The base URL for all API requests.
    - defaultHeaders {Object} (Optional): Default headers to apply to every request.
    - logging {boolean} (Optional): Enables request/response logging if set to true.
    - Returns: A function that can be used to make API requests with the configured options.

fetcher(options)
The main method for making an HTTP request.

- Parameters:
  - options {RequestOptions}: Configuration options for the HTTP request.
  - method {string}: HTTP method (e.g., methods.get, methods.post).
  - url {string}: Endpoint path appended to the base URL if provided.
  - contentType {string} (Optional): Specifies the content type (default is contentTypes.json).
  - headers {Object} (Optional): Custom headers for the request.
  - params {Object} (Optional): Query parameters for the request.
  - body {Object|string} (Optional): Request body, formatted based on the contentType.
  - timeout {number} (Optional): Timeout duration in milliseconds (default is 5000).
  - logging {boolean} (Optional): Enable/disable logging for this request.
  - Returns: A Promise that resolves to the response data or rejects with an error.

## Supported HTTP Methods

1. GET - methods.get
2. POST - methods.post
3. PUT - methods.put
4. DELETE - methods.delete

## Supported Content-Types

1. JSON - contentTypes.json
2. Form Data - contentTypes.formData
3. URL-encoded - contentTypes.formUrlEncoded
4. Plain Text - contentTypes.textPlain

## Example Usage

### Importing and Configuring the Client

```javascript
import { contentTypes, methods, create_instance } from "fetcher";

const fetcher = create_instance({
  baseURL: "https://api.example.com",
  defaultHeaders: {
    Authorization: "Bearer YOUR_TOKEN",
  },
  logging: true,
});
```

## Making Requests

### GET Request

```javascript
const response = await fetcher({
  method: methods.get,
  url: "/data",
  contentType: contentTypes.json,
  params: { id: 123 },
});
console.log(response);
```

### POST Request

```javascript
const response = await fetcher({
  method: methods.get,
  url: "/data",
  contentType: contentTypes.json,
  params: { id: 123 },
});
console.log(response);
```
