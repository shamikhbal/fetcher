import Fetcher from "./fetcher";
import FilePicker from "./helper/file_picker";
import { contentTypes } from "./types/content_types";
import { methods } from "./types/methods";

const fetcher = {
  Fetcher,
  contentTypes,
  methods,
};

export default fetcher;
export { contentTypes, Fetcher, FilePicker, methods };
