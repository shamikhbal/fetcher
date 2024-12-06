import fs from "fs";
import mime from "mime-types";
import path from "path";

class FilePicker {
  public static getSync(filePath: string): File {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);
      const mimeType = mime.lookup(filePath);

      return new File([fileBuffer], fileName, {
        type: mimeType.toString(),
      });
    } catch (error: any) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  public static async get(filePath: string): Promise<File> {
    try {
      const fileBuffer = await fs.promises.readFile(filePath);
      const fileName = path.basename(filePath);
      const mimeType = mime.lookup(filePath);

      return new File([fileBuffer], fileName, {
        type: mimeType.toString(),
      });
    } catch (error: any) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }
}

export default FilePicker;
