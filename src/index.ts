import Fetcher from "./fetcher";
import FilePicker from "./helper/file_picker";
import { contentTypes } from "./types/content_types";
import { methods } from "./types/methods";
import { ResponseBody } from "./types/response_body";

const fetcher = {
  Fetcher,
  contentTypes,
  methods,
};

export default fetcher;
export { contentTypes, Fetcher, FilePicker, methods, ResponseBody };
