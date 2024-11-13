import fetcher_client from "../src/fetcher";

describe("[FETCHER] - GET API", () => {
  it("FETCHER - GET", async () => {
    const fetcher = fetcher_client.create_instance({
      baseURL: "http://openlibrary.org",
      logging: true,
    });

    const result = await fetcher({
      timeout: 100000,
      method: fetcher_client.methods.get,
      url: "/search/lists.json",
      contentType: fetcher_client.contentTypes.json,
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
    // expect(result.data.docs).toBeInstanceOf(Array);
  });
});

// describe("[NEGATIVE] - Test API Call", () => {
//   it("should throw an error for invalid URL", async () => {
//     const fetcher = fetcher_client.create_instance({
//       baseURL: "http://openlibrary.org",
//     });

//     await expect(
//       fetcher({
//         method: fetcher_client.methods.get,
//         url: "/dummy/test",
//         contentType: fetcher_client.contentTypes.json,
//       })
//     ).rejects.toMatchObject({
//       ok: false,
//     });
//   });
// });
