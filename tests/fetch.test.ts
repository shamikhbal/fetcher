import fetcher_client from "../src/index";

describe("Test API Call", () => {
  it("should return list of books", async () => {
    const fetcher = fetcher_client.create_instance({
      baseURL: "http://openlibrary.org",
    });

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

    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
    expect(result.data).toHaveProperty("start", 0);
    expect(result.data.docs).toBeInstanceOf(Array);
  });
});
