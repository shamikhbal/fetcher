import { ResponseBody } from "../types/response_body";

const responseBuilder = async (response: Response): Promise<ResponseBody> => {
  const text = await response.text();
  try {
    const json = JSON.parse(text);
    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: json,
    };
  } catch (err) {
    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: text,
    };
  }
};

export default responseBuilder;
