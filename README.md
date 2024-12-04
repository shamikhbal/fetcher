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
npm install github:shamikhbal/fetcher#v1.1.0
```

## Importing Fetcher

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

### Creating an Instance

To simplify repeated API calls to the same base URL, you can create a client instance using create_instance. This function allows you to set a baseURL and default headers.

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

## API Reference

### Fetcher Class

The Fetcher class is the main interface for making HTTP requests.

#### Constructor

```javascript
new Fetcher(options);
```

- Parameters:
  - options {Object} (Optional):
    - baseURL {string}: The base URL for all API requests.
    - defaultHeaders {Object}: Default headers to apply to every request.
    - logging {boolean}: Enables request/response logging if set to true.

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
   ``

## Supported Content-Types

1. JSON - contentTypes.json
2. Form Data - contentTypes.formData
3. URL-encoded - contentTypes.formUrlEncoded
4. Plain Text - contentTypes.textPlain

## Example Usage

### Importing and Configuring the Client

```javascript
import { Fetcher, contentTypes, methods } from "fetcher";

const fetcher = new Fetcher({
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
const response = await fetcher.get({
  url: "/data",
  params: { id: 123 },
});
```

### POST Request

```javascript
const response = await fetcher.post({
  url: "/submit",
  body: { name: "John Doe", email: "john@example.com" },
});
```
