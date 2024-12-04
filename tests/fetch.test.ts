import { Fetcher, contentTypes, methods } from "../lib/index";

const fetcher = new Fetcher({
  baseURL: "http://openlibrary.org",
  logging: true,
  defaultHeaders: {
    test: "value",
  },
});

describe("[FETCHER] - GET API", () => {
  it("FETCHER - GET", async () => {
    const result = await fetcher.request({
      timeout: 100000,
      method: methods.get,
      url: "/search/lists.json",
      contentType: contentTypes.json,
      params: {
        q: "book",
        limit: 1000,
        offset: 0,
      },
    });

    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
    expect(result.data).toHaveProperty("start", 0);
  });
});

describe("[FETCHER] - GET API - method chaining", () => {
  it("FETCHER method chaining - GET", async () => {
    const result = await fetcher.get({
      url: "/search/lists.json",
      contentType: contentTypes.json,
      params: {
        q: "book",
        limit: 1000,
        offset: 0,
      },
    });

    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
    expect(result.data).toHaveProperty("start", 0);
  });
});
