import axios from "axios";

describe("AXIOS", () => {
  it("[AXIOS] [GET] - Positive Test", async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://67f4a4aecbef97f40d2ec8c5.mockapi.io/api/fetcher/time",
      headers: {},
    };

    const result = await axios.request(config);

    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
    expect(result.data).toBeInstanceOf(Array);
  });
});
