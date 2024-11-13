import axios from "axios";

describe("[AXIOS] - GET API", () => {
  it("AXIOS - GET", async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://openlibrary.org/search/lists.json?q=book&limit=1000&offset=0",
      headers: {},
    };

    const result = await axios.request(config);

    // expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
    expect(result.data).toHaveProperty("start", 0);
    expect(result.data.docs).toBeInstanceOf(Array);
  });
});
