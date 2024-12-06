import { Fetcher, contentTypes, methods } from "../lib/index";

const fetcher = new Fetcher({
  baseURL: "http://openlibrary.org",
  logging: true,
  defaultHeaders: {
    test: "value",
  },
});

describe("Fetcher GET Request", () => {
  it("should return a successful response with expected data", async () => {
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

  it("should throw an error when the request fails", async () => {
    try {
      await fetcher.request({
        timeout: 100000,
        method: methods.get,
        url: "/non-existent-endpoint",
        contentType: contentTypes.json,
      });
    } catch (error: any) {
      expect(error.ok).toBe(false);
      expect(error.status).toBe(404);
    }
  });
});

describe("Fetcher GET Request with Method Chaining", () => {
  it("should return a successful response with expected data", async () => {
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

  it("should throw an error when the request fails", async () => {
    try {
      await fetcher.get({
        url: "/non-existent-endpoint",
        contentType: contentTypes.json,
      });
    } catch (error: any) {
      expect(error.ok).toBe(false);
      expect(error.status).toBe(404);
    }
  });
});
