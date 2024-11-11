# fetcher

## Methods

1. get
2. post
3. put
4. delete

## Content-Types

1. json
2. formData
3. formUrlEncoded
4. textPlain

Fetcher is a promise-based HTTP client for nodejs. Build on top of Fetch but simplified.

Installation

```bash
    npm install github:shamikhbal/fetcher
```

Example usage

1. Import

```
import fetcher_client from "fetcher";
```

1. Create an instance

```
const fetcher = fetcher_client.create_instance({
      baseURL: "http://openlibrary.org",
    });
```

2. Rest API call

```
const result = await fetcher({
      method: fetcher_client.methods.get,
      url: "/search/lists.json",
      contentType: fetcher_client.contentTypes.json,
      params: {
        q: "book",
        limit: 20,
        offset: 0,
      },
    });
```
