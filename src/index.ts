import Fetcher from "./fetcher";
import { contentTypes } from "./types/content_types";
import { methods } from "./types/methods";

const fetcher = {
  Fetcher,
  contentTypes,
  methods,
};

export default fetcher;
export { contentTypes, Fetcher, methods };
